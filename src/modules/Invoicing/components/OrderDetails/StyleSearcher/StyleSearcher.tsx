import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { useDebounce } from '../../../../../utils/hooks';
import { getStyles } from '../../../../../services/services';
import { ActionMeta, MultiValue } from 'react-select';

interface SearcherProps {
    selectedValues: any;
    onChange: (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => void;
    className?: string;
    closeMenuOnSelect?: boolean;
    createAble?: boolean;
    isDisabled?: boolean;
    selfSerialNumber?: string;
    hideSelectedOptions?: boolean;
}

function StyleSearcher({
    selectedValues,
    onChange,
    className,
    closeMenuOnSelect = false,
    createAble = false,
    isDisabled = false,
    selfSerialNumber = '',
    hideSelectedOptions = true,
}: SearcherProps) {
    const [styleOptions, setStyleOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 200);

    useEffect(() => {
        search(debouncedSearch);
    }, [debouncedSearch]);

    useEffect(() => {
        search(debouncedSearch);
    }, [selfSerialNumber]);

    const search = async (search = '') => {
        getStyles(
            {
                limit: 10,
                searchTerm: search,
            },
            {
                onSuccess: (data) => {
                    setStyleOptions(
                        data?.map((item) => ({
                            value: item.serialNumber,
                            label: `${item.serialNumber} / ${item.styleCode || '-'}`,
                            ...item,
                        })),
                        // ?.filter((item) => {
                        //     if (selfSerialNumber) return item.serialNumber !== selfSerialNumber;
                        //     else return true;
                        // }),
                    );
                },
            },
        );
    };

    return (
        <>
            {createAble ? (
                <CreatableSelect
                    options={styleOptions}
                    isMulti
                    name='Style Code'
                    placeholder='Style Code / Serial'
                    className={className}
                    inputValue={searchTerm}
                    onInputChange={(val) => setSearchTerm(val)}
                    value={selectedValues}
                    onChange={onChange}
                    closeMenuOnSelect={closeMenuOnSelect}
                    isDisabled={isDisabled}
                    hideSelectedOptions={hideSelectedOptions}
                />
            ) : (
                <Select
                    options={styleOptions}
                    isMulti
                    name='Style Code'
                    placeholder='Style Code / Serial'
                    className={className}
                    inputValue={searchTerm}
                    onInputChange={(val) => setSearchTerm(val)}
                    value={selectedValues}
                    onChange={onChange}
                    closeMenuOnSelect={closeMenuOnSelect}
                    isDisabled={isDisabled}
                    hideSelectedOptions={hideSelectedOptions}
                />
            )}
        </>
    );
}

export default StyleSearcher;
