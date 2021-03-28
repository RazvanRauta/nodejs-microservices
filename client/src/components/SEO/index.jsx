import { NextSeo } from 'next-seo'
import React from 'react'

const SEO = ({ title = null }) => {
    return (
        <NextSeo
            title={title}
            titleTemplate="%s | GetTix | RRazvan"
            description="Microservices example with NodeJS and NextJS"
            defaultTitle="GetTix | RRazvan"
            canonical="https://stage-gettix.rrazvan.dev/"
            openGraph={{
                url: 'https://stage-gettix.rrazvan.dev/',
                title: 'GetTix | RRazvan',
                description: 'Microservices example with NodeJS and NextJS',
                images: [
                    {
                        url:
                            'https://stage-gettix.rrazvan.dev/assets/images/meta.png',
                        width: 769,
                        height: 362,
                        alt: 'GetTix',
                    },
                ],
                site_name: 'GetTix | RRazvan',
            }}
            twitter={{
                handle: '@handle',
                site: '@site',
                cardType: 'summary_large_image',
            }}
            additionalMetaTags={[
                {
                    name: 'viewport',
                    content:
                        'width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no',
                },
            ]}
        />
    )
}

export default SEO
