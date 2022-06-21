import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'

import styles from './highlight.module.css'

export default function Highlight({ reversed, title, img, text, link,url,isDark }) {
    const left = <div className={clsx('col col--6', styles.featureImage, reversed ? styles.featureImageReversed : '')}>{img}</div>
    const right = (
        <div className={clsx('col col--6', styles.featureContent, reversed ? styles.featureContentReversed : '')}>
            <h3 className={'highlighttitle' }>{title}</h3>
            {text}
            <Link
                            to={url}
                            className={clsx(
                                'button button--outline button--secondary button--lg',
                                styles.getStarted,
                            )}
                        >{link}</Link>
        </div>
    )

    return (
        <section className={clsx('highlightSection', isDark ? styles.darkSection + ' darkSection' : '')}>
            <div className="container">
                <div className="row">
                    {reversed ? (
                        <>
                            {right}
                            {left}
                          

                        </>
                    ) : (
                        <>
                            {left}
                            {right}
                      
                        </>
                    )}
                                               
                </div>
            </div>
        </section>
    )
}
