import { useState } from 'react'
import { Code, Display, Input, Link, Loading, Page, Text } from '@geist-ui/core'
import Head from 'next/head'
import Header from '../components/Header'
import useSWR from 'swr'
import { useDebounce } from '../hooks/useDebounce'
import { fetcher } from '../lib/fetcher'
import { Article } from '../components/Article'
import { WIKI_URL } from '../config'


const getAPIUrl = (searchString: string, limit = 25) => 
  `${WIKI_URL}w/api.php?action=query&origin=*&format=json&prop=extracts&exintro&explaintext&generator=search&gsrnamespace=0&gsrlimit=${limit}&gsrsearch=${encodeURIComponent(searchString)}`

export default function Home() {
  const [searchString, setSearchString] = useState('')
  const debouncedSearch = useDebounce(searchString, 500)

  const { data, isValidating } = useSWR(
    () => debouncedSearch ? getAPIUrl(debouncedSearch) : null,
    fetcher
  )

  return (
    <div>
      <Head>
        <title>Geist UI with NextJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page dotBackdrop width="800px">
        <Page.Header paddingTop="1em">
          <Header />
        </Page.Header>
        <Page.Content>
          <Text p>Her kan du søke etter noe spennende i Wikipedia -&nbsp;kanskje du finner noe spennende òg! 👇</Text>
          <Input 
            value={searchString}
            onChange={e => setSearchString(e.target.value)}
            placeholder="Tast inn søketerm her.." 
            clearable
            scale={4/3}
            style={{ fontSize: "16px" }}
            width="100%"
          />
           <Display width="100%">
            {
              isValidating 
                ? <Loading />
                : ""
            }

            {
              data?.query?.pages
                ? <>
                    <Text h3>Søkeresulater for <Code classic>{debouncedSearch}</Code>:</Text>
                    {
                      Object.entries(data.query.pages).map(([key, article]) => {
                        return <Article article={article} key={key} />
                      })
                    }
                  </>
                : !isValidating && debouncedSearch
                  ? <Text h3>Ingen treff på <Code>{debouncedSearch}</Code> 😳</Text>
                  : ""
            }
            
          </Display>
        </Page.Content>
        <Page.Footer paddingBottom="1em">
          <Text small type='secondary'>Alle data er hentet fra Wikipedia, som er lisensiert under <Link href="https://creativecommons.org/licenses/by-sa/3.0/">Creative Commons 3.0-lisensen</Link>.</Text>
        </Page.Footer>
      </Page>
    </div>
  )
}
