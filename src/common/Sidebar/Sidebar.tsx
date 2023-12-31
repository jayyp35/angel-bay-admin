import { useEffect, useState } from 'react';
// import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
const pages = [
    { id: 'dd-styles', name: 'Add Styles', link: '/app/add-styles' },
    // { id: 'add-collection', name: 'Add Collection', link: '/app/add-collection' },
    { id: 'view-styles', name: 'View Styles', link: '/app/view-styles' },
    { id: 'create-invoice', name: 'Create Invoice', link: '/app/create-invoice' },
    { id: 'lookbooks', name: 'Figma Lookbooks', link: '/app/lookbooks' },
];

function Sidebar() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(pages[0].id);

    useEffect(() => {
        for (let i = 0; i < pages?.length; i++) {
            if (window.location.pathname.includes(pages[i].id)) {
                setSelectedOption(pages[i].id);
                break;
            } else if (i === pages?.length - 1) setSelectedOption('');
        }
    }, []);

    return (
        <div className={styles.Sidebar}>
            {pages.map((item) => (
                <div
                    className={clsx(styles.Option, {
                        [styles.Selected]: selectedOption === item.id,
                    })}
                    key={item.id}
                    onClick={() => {
                        setSelectedOption(item.id);
                        item.link && navigate(item.link);
                    }}>
                    {item.name}
                </div>
            ))}
        </div>
    );
}

export default Sidebar;
