INSERT INTO mdblog.posts (title, genre, create_date, update_date, published, filetype, content)
VALUES (
    'ブログはじめました', -- title
    'ポエム', -- genre
    '2023-08-02', -- create_date (dateの値)
    NULL, -- update_date (更新日は不明なのでNULL)
    TRUE, -- published (公開状態、必要に応じてTRUEかFALSE)
    'md', -- filetype (マークダウンファイルなので'md')
    E'本体は next.js (app router),\nスタイリングは tailwind,\n記事自体は markdown で記述し、それを react-markdown と gray-matter つかってコンポーネント化してます\n\nホスト先は vercel です\ngithub のリポジトリ指定するだけで一瞬でデプロイされかなり体験がいい\n\nというわけで名に負けないようなお料理ブログにしていくぞという気持ちです\nかかってこい　よろしくお願いします' -- content (本文)
);

INSERT INTO mdblog.posts (title, genre, create_date, update_date, published, filetype, content)
VALUES (
    'lan 内の別端末から wsl に ssh 接続する', -- title
    'パソコン', -- genre
    '2023-08-05', -- create_date
    NULL, -- update_date (更新日は不明なのでNULL)
    TRUE, -- published (公開状態、必要に応じてTRUEかFALSE)
    'md', -- filetype (マークダウンファイルなので'md')
    E'ググったらそのものズバリの回答があったので覚え書き、こちらのコメ欄が参考\n[wsl2 で ssh サーバを起動し、外部からそこに接続 - Qiita](https://qiita.com/yabeenico/items/15532c703974dc40a7f5)\n\n接続先端末の wsl 上で sshd を起動しておく\n\n```sh\nsudo vi /etc/ssh/sshd_config\nsudo service ssh start\n```\n\n接続先端末で powershell を管理者起動して以下実行\nディストリ名はよしなに\n\n```powershell\n$IP = (wsl -d Ubuntu-22.04 exec hostname -I).Trim()\nnetsh.exe interface portproxy delete v4tov4 listenport=22\nnetsh.exe interface portproxy add v4tov4 listenport=22 connectaddress=$IP\n```\n\n初回のみファイアウォールでブロックされてる ssh 接続を開放\n\n```powershell\nNew-NetFirewallRule -DisplayName \'SSH\' -Direction Inbound -LocalPort 22 -Protocol TCP -Action Allow\n```\n\nあとは接続元端末でアクセスするだけ、特に設定しなくても名前解決してくれた\n\n```\nssh [user]@[hostname] -p 22\n```\n\nよかったですね　おわり' -- content (本文)
);

INSERT INTO mdblog.posts (title, genre, create_date, update_date, published, filetype, content)
VALUES (
    'vimで改行コードを削ってペースト', -- title
    'パソコン', -- genre
    '2023-08-05', -- create_date
    NULL, -- update_date (更新日は不明なのでNULL)
    TRUE, -- published (公開状態、必要に応じてTRUEかFALSE)
    'md', -- filetype (マークダウンファイルなので'md')
    E'まず前提として、vim でヤンクペーストするテキストは vim のレジスタ内で完結しているので、\n例えば wsl 上で vim を動かしているときにテキストをホスト側とやり取りするには vimrc に何かしらの設定が必要、というのは周知の通りだとおもいますが\n\n```init.lua\n-- 一例\nvim.cmd([[ set clipboard^=unnamedplus ]])\n\nvim.g.clipboard = {\n\tname = \'\'win32yank\'\',\n\tcopy = {\n\t\t[\'\'+\'\'] = \'\'win32yank.exe -i\'\',\n\t\t[\'\'*\'\'] = \'\'win32yank.exe -i\'\'\n\t},\n\tpaste = {\n\t\t[\'\'+\'\'] = \'\'win32yank.exe -o\'\',\n\t\t[\'\'*\'\'] = \'\'win32yank.exe -o\'\'\n\t},\n\tcache_enabled = 1\n}\n```\n\nwin 上でコピーしたテキストを vim 側にペーストするときに改行コードの違いでバグってて、\n![img](/images/2023-08-05_hp000343.png)\n↑^M が残る\n\nまあ vscode とか windows terminal とかの vim フロントエンド側のペースト使えばいいだけだから全く困ってなくて放置してたんだけどいい加減直すかと思って直してもらったら直った\n\n[https://chat.openai.com/share/9e4e3fa5-125d-44fa-a2c2-394c01f8b641](https://chat.openai.com/share/9e4e3fa5-125d-44fa-a2c2-394c01f8b641)\n\ngist はこちら\n[https://gist.github.com/ngmtine/0afbf207d73edfcc8a975a0c2f4e41ff](https://gist.github.com/ngmtine/0afbf207d73edfcc8a975a0c2f4e41ff)\n\nおれたちはもうお喋り AI のいない世界には戻れない\nlua のこと 1 ミリも知らないのでもしバグってたら chat gpt に文句言ってください\n\nおわり\n\n追記：これ書いてるときに vim の開発者 Bram Moolenaar 氏が亡くなったそうです\nRIP' -- content (本文)
);

INSERT INTO mdblog.posts (title, genre, create_date, update_date, published, filetype, content)
VALUES (
    '各セルが編集可能なそこそこ大きめのテーブルをreact-virtuosoで扱う', -- title
    'パソコン', -- genre
    '2023-11-19', -- create_date
    NULL, -- update_date (更新日は不明なのでNULL)
    TRUE, -- published (公開状態、必要に応じてTRUEかFALSE)
    'md', -- filetype (マークダウンファイルなので'md')
    E'各セルが編集可能なテーブル（つまり tr > td > input ということ）を扱いたい時を考える\n\n普通に実装すると、ラッパーコンポーネントのuseStateでデータと更新関数を初期化してセルコンポーネントまでバケツリレーし、\nセルコンポーネントのonChangeでデータ更新…という感じになると思う\nデータ量がそれほどでも無いときはこれで全く問題ないが、データが増えてくるとブラウザが重くなりしんどみが発生する\n\n具体的には10万セルで初期表示とセル編集に各5秒程度ラグる\n[https://ngmtine.github.io/table_virtuoso_example/](https://ngmtine.github.io/table_virtuoso_example/)\n↑の「プレーンなreactでのテーブル実装例（仮想スクロールライブラリ不使用）」が愚直な実装例\nセルクリックしたり（クリックするとピンク色になります）、「編集済みのみ表示」ボタン押すときの挙動がアホほど重いのがわかると思います\n\n（本筋とは逸れるけどgithub pagesでurl遷移を扱うのわかんなくて匙投げた、\nurl直打ちしても404になるので手でページ移動してください）\n\nこの実装でブラウザが重くなる理由は当然で、セル編集が発生するたびにテーブル全体のデータが更新されご丁寧に全セルが再レンダリングされるため\n\nではセルごとに独立して状態を持ってメモ化すればと考えても初期レンダリングに時間がかかるのは変わらないし、そもそもDOMというのは重いため行数がある程度になってくるとどうしてもブラウザが硬直してしまう\n以前別件でデカめのデータ扱った時、バニラjsですら10数万行程度で指定端末のブラウザが死ぬということがあった（そもそもページネーション使えという話だが…）\n\nというわけで仮想スクロールライブラリの使用を検討する\nなんかいろいろあるっぽいけどざっと見てみた感じ [react-virtuoso](https://github.com/petyosi/react-virtuoso) がシンプルで良さげだったので実装してみた\n使用感は先程のurlの「rect-virtuoso 実装例」の方です\n\nf12開いて分かる通り、スクロールするたびに画面内に表示するだけのtrがレンダリングされる  
このため初期表示もセル編集時もシャキシャキで非常に体験が良い  
実装は[こちら](https://github.com/ngmtine/table_virtuoso_example)  
スタイリングがカスなのは本筋とは関係ないからです

注意点として、仮想スクロールはスクロールのたびに要素が削除＆作成されるため、セルが独立して状態を持てない（`const [hoge] = useState()`とかしてもスクロールで初期化される）

TableVirtuosoに渡すitemContentとfixedHeaderContentは呼び出し元コンポーネント内で定義すればクロージャで呼び出し元コンポーネントの変数にアクセスできる  
当初セルコンポーネント内で元データ使用するためにハンドラ関数のカスタムフック作ったりjotaiとかのグローバル状態管理ライブラリ使ったりしてたのでこれ気づいた時アハ体験だった、もしかしてreactあるあるイディオムだったりするのかしら

あといくら仮想スクロールといえど、例えばタブレットで勢いよくスワイプしたりロジマウスとかのベアリングホイールでシュイーンってしたりするときも律儀に要素の削除と作成が実行されるので微妙にもたつきを感じるかもしれない　これはどうしようもない

というわけで今回の実装はセルのonChangeでデータ更新があったときにどうしても全セル再レンダリングされるのを仮想スクロールで緩和しましょうというお話でした  
ベストは仮想スクロールかつデータ更新時に単一セルのみ再レンダリングされるような実装にすることだけどそんな方法あんのか？セルのメモ化だけでできるのかしら　よく分からなかったので今後の宿題としましょう

ともあれテーブルサクサクでよかったですね　おわり');

INSERT INTO mdblog.posts (title, genre, create_date, update_date, published, filetype, content)
VALUES (
    '謹賀新年', -- title
    '雑記', -- genre
    '2024-01-08', -- create_date
    NULL, -- update_date (更新日は不明なのでNULL)
    TRUE, -- published (公開状態、必要に応じてTRUEかFALSE)
    'md', -- filetype (マークダウンファイルなので'md')
    '賀正' -- content (本文)
);

INSERT INTO mdblog.posts (title, genre, create_date, update_date, published, filetype, content)
VALUES (
    'discordでシェル実行するbotつくった', -- title
    'パソコン', -- genre
    '2024-01-14', -- create_date
    NULL, -- update_date (更新日は不明なのでNULL)
    TRUE, -- published (公開状態、必要に応じてTRUEかFALSE)
    'md', -- filetype (マークダウンファイルなので'md')
    E'自分しかいないメモ用のdiscordサーバーでシェル実行できたら便利だなと思って作った\n[ngmtine/discord_bot](https://github.com/ngmtine/discord_bot)\n\n実際に動いているところはこんな感じ\n\n![img](/images/2024-01-14_discord.png)\n\n見たい配信あるけど出先で見れないよ～って時とかにurl投げてアレしたりできるのでかなり体験がいい\n\nワイは自鯖運用してる[intel n100マシン](https://www.amazon.co.jp/gp/product/B0BWLXCWXY/)で動かしてるけどスマホパクられた時とかどう考えてもやばいので皆さんは適当にvps借りて動かせばいいと思います\n\n便利でよかったですね　おわり' -- content (本文)
);



