import { useState } from 'react';
// import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
const pages = [
  { id: 'addstyles', name: 'Add Styles', link: '/home/addstyles' },
  { id: 'addcollection', name: 'Add Collection', link: '/home/addcollection' },
  { id: 'viewstyles', name: 'View Styles', link: '/home/viewstyles' },
]

function Sidebar() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(pages[0].id)

  return (
    <div className={styles.Sidebar}>
      {pages.map((item) => (
        <div
          className={clsx(styles.Option, {
            [styles.Selected]: selectedOption === item.id
          })}
          key={item.id}
          onClick={() => {
            setSelectedOption(item.id)
            // navigate(item.link)
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default Sidebar