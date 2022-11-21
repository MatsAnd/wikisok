import { Fieldset, Link } from "@geist-ui/core"
import { WIKI_URL } from "../config"
import Skeleton from "./Skeleton/Skeleton"

type SearchArticle = {
    pageid: number, 
    index: number,
    ns: number, 
    title: string, 
    extract: string,
}

type ArticleProps = {
    article: SearchArticle | undefined
}

export const Article = ({ article }: ArticleProps) => {
    const pageUrl = `${WIKI_URL}?curid=${article?.pageid}`
    console.log(article)

    return (
        <Fieldset style={{marginBottom: "1em"}}>
            <Fieldset.Title>
                <Skeleton loading={!article} randomWidth={[100, 300]}>
                    { article?.title || " " }
                </Skeleton>
            </Fieldset.Title>
            <Fieldset.Subtitle style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                <Skeleton loading={!(article)} randomWidth={[200, 700]}>
                    {article?.extract || " "}
                </Skeleton>
            </Fieldset.Subtitle>
            <Fieldset.Footer onClick={() => article && window.open(pageUrl)} style={{ flexDirection: "row-reverse" }} >
                <Skeleton loading={!article} variant="rectangle" width="110px">
                    <Link href="#">Gå til artikkel 👉</Link>
                </Skeleton>
            </Fieldset.Footer>
        </Fieldset>
    )
}

