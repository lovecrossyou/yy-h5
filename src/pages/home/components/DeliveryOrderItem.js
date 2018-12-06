import styles from './page.css'
export const DeliveryOrderItem = ()=>{
  return <div className={styles.item}>
    <div className={styles.item_addr}>北京市朝阳区安贞门神新家园562号楼4单元230</div>
    <div className={styles.item_contact}>任艳彤 18356248596</div>

    <div className={styles.item_product_list}>
      <div className={styles.item_product_img}/>
      <div className={styles.item_product_img}/>
      <div className={styles.item_product_img}/>
    </div>
  </div>
}
