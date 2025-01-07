import { DeleteIcon } from "../Icons/DeleteIcon"
import { DocumantIcon } from "../Icons/DocumantIcon"
import { ShareIcon } from "../Icons/ShareIcon"

interface CardProps {
    title: string;
    link: string;
    tags?: string;
    type: "twitter" | "youtube";
}

export const Card = ({ title, link, tags, type }: CardProps) => {
    return (
        <div className=" bg-white rounded-md border border-gray-200 p-4 min-h-48 max-w-80">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <DocumantIcon />
                    <h1 className="text-md font-bold ">{title}</h1>
                </div>
                <div className="flex gap-4 items-center" >
                    <ShareIcon />
                    <DeleteIcon />
                </div>
            </div>
            <div className="pt-2">

                {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/").split("&")[0]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>}
            </div>

        </div>

    )
}