export interface WikiApiArticle {
    pageid: number, 
    index: number,
    ns: number, 
    title: string, 
    extract: string,
}

export interface WikiApiResponse {
    continue?: {
        excontinue: number,
        continue: string
    },
    query?:{
        pages: {
            [key: string]: WikiApiArticle
        }
    }
}