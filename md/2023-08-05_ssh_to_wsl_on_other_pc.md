---
title: lan 内の別端末から wsl に ssh 接続する
date: 2023-08-05
description: ""
genre: "パソコン"
---

ググったらそのものズバリの回答があったので覚え書き、こちらのコメ欄が参考  
[wsl2 で ssh サーバを起動し、外部からそこに接続 - Qiita](https://qiita.com/yabeenico/items/15532c703974dc40a7f5)

接続先端末の wsl 上で sshd を起動しておく

```sh
vi /etc/ssh/sshd_config
sudo service ssh start
```

接続先端末で powershell を管理者起動して以下実行  
ディストリ名はよしなに

```powershell
$IP = (wsl -d Ubuntu-22.04 exec hostname -I).Trim()
netsh.exe interface portproxy delete v4tov4 listenport=22
netsh.exe interface portproxy add v4tov4 listenport=22 connectaddress=$IP
```

初回のみファイアウォールでブロックされてる ssh 接続を開放

```powershell
New-NetFirewallRule -DisplayName 'SSH' -Direction Inbound -LocalPort 22 -Protocol TCP -Action Allow
```

あとは接続元端末でアクセスするだけ、特に設定しなくても名前解決してくれた

```
ssh [user]@[hostname] -p 22
```

よかったですね　おわり
