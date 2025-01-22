import { Twitter, Youtube, Trash2, SquareArrowOutUpRight } from "lucide-react";

interface CardProps {
    title: string;
    link: string;
    // tags?: string;
    type: "twitter" | "youtube";
}

export const SharedBrainCard = ({ title, link, type }: CardProps) => {

    return (
        <div className=" bg-white rounded-md border border-gray-200 p-4  max-h-fit min-h-52 min-w-80 max-w-80">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    {type === "youtube" && <Youtube className="text-red-600" />}
                    {type === "twitter" && <Twitter className="text-blue-500" />}
                    <h1 className="text-md font-bold ">{title}</h1>
                </div>
                <div className="flex gap-4 items-center" >
                    <SquareArrowOutUpRight className="text-gray-600 h-5 w-5 cursor-pointer hover:text-blue-400" onClick={() => window.open(link, "_blank")} />
                    <Trash2 className="z-50 text-gray-400 h-5 w-5 cursor-not-allowed hover:text-red-500  "  />
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