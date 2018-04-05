import React, {Component} from 'react'

import styles from './Page1.css'
import image from './images/mm.jpg'

export default class Page1 extends Component {
    render() {
        return (
            <div className={styles['page-box']}>
                this is page1~!
                <img src={image} />
            </div>
        )
    }
}