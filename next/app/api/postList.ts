import { executeQuery } from "../util/executeQuery";

const queryStr = `
SELECT
    id, title, genre, create_date, update_date, published, filetype, content
FROM
    mdblog.posts
WHERE
    published = true
ORDER BY
    create_date DESC
;`;

// 記事一覧取得api
export const GET = async () => {
    const posts = await executeQuery(queryStr);
    return posts;
};

/*

curl -X GET localhost:3000/api/postList

*/
