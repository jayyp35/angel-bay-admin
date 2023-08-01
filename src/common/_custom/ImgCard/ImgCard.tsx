import styles from './ImgCard.module.scss';
import plusIcon from '../../../assets/plus.svg';

function ImgCard({
  imgUrl
}: {
  imgUrl: string;
}) {
  return (
    <div className={styles.ImgCard}>
      <img src={plusIcon} alt='plus' height='15px' />
      {/* ImgCard */}
    </div>
  )
}

export default ImgCard;