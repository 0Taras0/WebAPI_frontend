import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const CategorySearchForm = ({
                                searchName,
                                searchSlug,
                                pageSize,
                                onSearchNameChange,
                                onSearchSlugChange,
                                onPageSizeChange,
                                onSearch,
                            }) => {
    const inputStyle = { width: 200 };

    return (
        <Form
            layout="inline"
            onFinish={onSearch}
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: 24,
            }}
        >
            <Form.Item>
                <Input
                    placeholder="Пошук по назві"
                    value={searchName}
                    onChange={(e) => onSearchNameChange(e.target.value)}
                    allowClear
                    style={inputStyle}
                />
            </Form.Item>

            <Form.Item>
                <Input
                    placeholder="Пошук по слагу"
                    value={searchSlug}
                    onChange={(e) => onSearchSlugChange(e.target.value)}
                    allowClear
                    style={inputStyle}
                />
            </Form.Item>

            <Form.Item>
                <Select
                    value={pageSize}
                    onChange={onPageSizeChange}
                    style={inputStyle}
                >
                    {[5, 10, 15, 20].map((num) => (
                        <Option key={num} value={num}>
                            {num} на сторінку
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default CategorySearchForm;