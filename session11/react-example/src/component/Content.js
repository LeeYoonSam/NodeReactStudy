import React, { Component } from 'react';
import styles from './Content.css';

class Content extends Component {
    render() {
        
        return (
            <div className={styles.contentWrap}>
                <div className={styles.item}>아이템</div>
                <div className={styles.item}>아이템</div>
                <div className={styles.item}>아이템</div>
            </div>
        );
    }
}
export default Content;