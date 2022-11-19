import { Fieldset, Link } from "@geist-ui/core"
import { WIKI_URL } from "../config"

type SearchArticle = {
    pageid: number, 
    index: number,
    ns: number, 
    title: string, 
    extract: string,
}

type ArticleProps = {
    article: SearchArticle | any
}

export const Article = ({ article }: ArticleProps) => {
    const pageUrl = `${WIKI_URL}?curid=${article?.pageid}`

    return (
        <Fieldset style={{marginBottom: "1em"}}>
            <Fieldset.Title>{article?.title}</Fieldset.Title>
            <Fieldset.Subtitle style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {article?.extract}
            </Fieldset.Subtitle>
            <Fieldset.Footer onClick={() => window.open(pageUrl)} style={{ flexDirection: "row-reverse" }} >
                <Link href="#">Gå til artikkel 👉</Link>
            </Fieldset.Footer>
        </Fieldset>
    )
}

