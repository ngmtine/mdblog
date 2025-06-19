import Link from "next/link";
import { encodeUrl } from "~/lib/encodeUrl";
import { executeQuery } from "~/lib/executeQuery";
import type { Genre } from "~/lib/types";

const getGenresQuery = `
SELECT
    DISTINCT genre as name
FROM
    mdblog.posts
${process.env.NODE_ENV === "production" ? "WHERE published = true" : ""}
ORDER BY
    name ASC
;`;

export const GenreList = async () => {
    const genres = await executeQuery<Genre>(getGenresQuery);

    if (!genres || genres.length === 0) {
        return undefined;
    }

    return (
        <ul id="genreList" className="menu w-auto min-h-full">
            {genres.map((genre) => (
                <li key={genre.name}>
                    <Link //
                        className="btn btn-ghost justify-start text-left"
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
