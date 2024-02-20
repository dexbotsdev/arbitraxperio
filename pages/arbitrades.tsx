import { ProForm, ProFormText } from '@ant-design/pro-components';
import { memo, useEffect, useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/lib/table';
import { Container, Text, Title } from '@mantine/core';
import axios from 'axios';
import { ConfigProvider, theme, Card } from "antd";

const { Search } = Input;

const columns: ColumnType<any>[] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Symbol',
        dataIndex: 'symbol',
        key: 'symbol',
        sorter: (a, b) => a.symbol.localeCompare(b.symbol),
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Buy Exchange',
        dataIndex: 'buyAtExchange',
        key: 'buyAtExchange',
        sorter: (a, b) => a.buyAtExchange.localeCompare(b.buyAtExchange),
    },
    {
        title: 'Buy Price',
        dataIndex: 'buyPrice',
        key: 'buyPrice',
        sorter: (a, b) => a.buyPrice - b.buyPrice,
    },
    {
        title: 'Sell Exchange',
        dataIndex: 'sellAtExchange',
        key: 'sellAtExchange',
        sorter: (a, b) => a.sellAtExchange.localeCompare(b.sellAtExchange),
    },
    {
        title: 'Sell Price',
        dataIndex: 'sellPrice',
        key: 'sellPrice',
        sorter: (a, b) => a.sellPrice - b.sellPrice,
    },
    {
        title: 'Profit',
        dataIndex: 'profit',
        key: 'profit',
        sorter: (a, b) => a.profit - b.profit ,
        render: (_, record) => (
          <Space size="middle">
            <Text>{Number(record.profit*100).toFixed(2)} % </Text>
          </Space>
        ), 
    },
    {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        sorter: (a, b) => a.timestamp - b.timestamp,
        render: (_, record) => (
          <Space size="middle">
            <Text>{new Date(record.timestamp).toUTCString()}</Text>
          </Space>
        ), 
    },
];

const ArbData: React.FC = () => {

    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState();
    const handleSearch = (selectedKeys: React.Key[], confirm: () => void) => {
        confirm();
    };
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(true);

    const handleClick = () => {
        setIsDarkMode((previousValue) => !previousValue);
    };
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
    };
    const [refreshInterval, setRefreshInterval] = useState(11000);
    const fetchMetrics = () => {
        axios.get('https://arbdata-production.up.railway.app/arbdata').then((data) => {
            console.log(data.data);

            setData(data.data);

        })
    }
    useEffect(() => {
        fetchMetrics();
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(fetchMetrics, refreshInterval);
            return () => clearInterval(interval);
        }
    }, [refreshInterval]);

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value: any, record: any) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    });


    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}>
            <Container fluid>
                <div>
                    <h1>Arbitrage</h1>
                    <Search
                        placeholder="Search by Symbol"
                        onSearch={(value) => setSearchText(value)}
                        style={{ marginBottom: 16 }}
                    />
                    <Table
                        dataSource={data}
                        columns={columns.map((col: any) => ({
                            ...col,
                            ...getColumnSearchProps(col.dataIndex),
                        }))}
                    />
                </div>
            </Container></ConfigProvider >
    );
};

export default memo(ArbData);
