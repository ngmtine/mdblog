import Link from "next/link";
import { executeQuery } from "~/app/util/executeQuery";
import type { Genre } from "~/app/util/types";
import { encodeUrl } from "../../util/encodeUrl";

const getGenresQuery = `
SELECT
    DISTINCT genre as name
FROM
    mdblog.posts
ORDER BY
    name ASC
;`;

export const GenreList = async () => {
    const genres = await executeQuery<Genre>(getGenresQuery);

    if (!genres || genres.length === 0) {
        return undefined;
    }

    return (
        <ul id="genreList" className="menu min-h-full">
            {genres.map((genre) => (
                <li key={genre.name}>
                    <Link //
                        className="btn btn-ghost max-w-[min(100%,-webkit-fill-available)] inline-flex justify-start text-left"
                        href={`/genre/${encodeUrl(genre.name)}`}
                        aria-label={genre.name}
                    >
                        {genre.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
