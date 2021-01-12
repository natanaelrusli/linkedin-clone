import { FiberManualRecord, Info } from '@material-ui/icons'
import React from 'react'
import './Widgets.css'

function Widgets() {
    const newsArticle = (heading, subtitle) => {
        return(
            <div className="widgets__article">
                <div className="widgets__articleLeft">
                    <FiberManualRecord/>
                </div>

                <div className="widgets__articleRight">
                    <h4>{heading}</h4>
                    <p>{subtitle}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <Info/>
            </div>
            {newsArticle("React is GREAT!", "Top News 999 Readers")}
            {newsArticle("React is GREAT!", "Top News 999 Readers")}
        </div>
    )
}

export default Widgets
