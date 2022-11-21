import React, { useState } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import { Code, Display, Input, Link, Page, Text } from '@geist-ui/core'
import Header from '../components/Header'
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
        <title>Wikisøk</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔍</text></svg>" />
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
            <Text h3>
              {
                isValidating || data?.query?.pages 
                  ? <>Søkeresulater for <Code classic>{debouncedSearch}</Code>:</>
                  : debouncedSearch && !data?.query?.pages
                    ? <>Ingen treff på <Code>{debouncedSearch}</Code> 😳</>
                    : ""
              }
            </Text>

            {
              isValidating && 
                <>
                  {
                    Array.from(Array(4).keys()).map((key) => {
                      return <Article key={key} />
                    })
                  }
                </>
            }
            {
              data?.query?.pages && 
                <>
                  {
                    Object.entries(data.query.pages).map(([key, article]) => {
                      return <Article article={article} key={key} />
                    })
                  }
                </>
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
