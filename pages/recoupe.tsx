import { LoadingOverlay, Button, Card, Center, Checkbox, Container, Divider, Grid, Text, Group, Textarea, Title, rem, Fieldset, UnstyledButton, ThemeIcon, Paper, Notification } from "@mantine/core";
import PageComponent from "./PageComponent";
import { SetStateAction, memo, useState } from "react";
import { TextInput, Select, } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { ethers } from "ethers";

import {
    Input,
    Radio,
    Switch,
    Tooltip,
    Drawer,
} from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";


const RecoupePage = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [visible, { toggle }] = useDisclosure(false);
    const [value, setValue] = useState<string | null>();
    const [methodsList, setMethodsList] = useState<any[]>();
    const [selectList, setSelectList] = useState<string[]>();
    const [wallet, setWallet] = useState<string>();
    const [walletPK, setWalletPK] = useState<string>();
    const [destContract, setDestContract] = useState<string>();
    const [calldata, setCalldata] = useState<string>();
    const [recvWallet, setRecvWallet] = useState<string>();
    const [paramsSize, setParamsSize] = useState<number>(0);

    const form = useForm({
        initialValues: {
            recoveryOption: 'contract',
            selectedMethod: '',
            wallet: '',
            walletPK: '',
            destContract: '',
            recvWallet: '',
            calldata: '',


        },
    });

    const formMain = useForm({
        initialValues: {
            recoveryOption: 'contract',
            destContract: '',
        },
    })


    const displayFormItems = (selectedItem: any[]) => {


        const links = selectedItem.map((item, index) => (
            <Grid.Col span={12} style={{ justifyContent: "flex-end" }} key={item.name}>
                <TextInput label={item.name == '' ? item.type : item.name} placeholder="" {...form.getInputProps(`Item${index}`)} withAsterisk radius="xl" variant="filled" />
            </Grid.Col>
        ));

        return links;
    }

    const itemsDisplay = () => {

        const selectedMethod: string = form.values.selectedMethod;
        if (methodsList && selectedMethod) {

            const listMap: any[] = methodsList;

            const inputs = listMap.filter((item: { name: string; }) => item.name == selectedMethod)[0].inputs;


            return displayFormItems(inputs);
        }

        return;
    }

    const openDrawer = () => {
        if (formMain.values.recoveryOption == '') {
            notifications.show({
                title: 'Notification',
                color: 'red',
                autoClose: 2000,
                message: 'Hey there, Select Recovery Option',
            })

            return;
        }


        if (formMain.values.destContract == '') {
            notifications.show({
                title: 'Notification',
                color: 'red',
                autoClose: 5000,
                message: 'Hey there, Enter the Desination Contract First! 🤥',
            })

            return;
        }
        const address = validateAddress(formMain.values.destContract);
        form.setFieldValue('selectedMethod','');
        form.reset();
        if (address !== 'Not A Valid Contract') {
            const tog = toggle;
            tog();
            open();
            const add = formMain.values.destContract;
            axios.get(`/api/contractDetails?address=${add}`).then((res) => {
                console.log(res.data);

                if (res.data != '0') {


                    const result = JSON.parse(JSON.stringify(res.data));
                    setMethodsList(result);

                    let selmap: string[] = [];

                    result.map((item: { name: any; }) => {
                        selmap.push(item.name);
                    })
                    console.log(selmap);



                    setSelectList(selmap);
                } else {
                    notifications.show({
                        title: 'Notification',
                        color: 'red',
                        autoClose: 5000,
                        message: 'Not a valid Contract with ABI',
                        onClose: () => tog(),
                    })
                    tog();
                    return;
                }
                tog();
            })
        } else {
            notifications.show({
                title: 'Notification : ',
                color: 'red',
                autoClose: 5000,
                message: 'Hey there, Enter a Proper Desination Contract First! 🤥',
            })

            return;
        }
    }



    const generateCallData = () => {

        if (!form.values.selectedMethod || form.values.selectedMethod == '') {
            notifications.show({
                title: 'Notification : ',
                color: 'red',
                autoClose: 5000,
                message: 'Select a ABI Method and enter method arguments to continue.',
            })
            return;
        }

        let paramsSize = 0;
        const selectedMethod: string = form.values.selectedMethod;
        if (methodsList && selectedMethod) {

            const listMap: any[] = methodsList;
            const inputs = listMap.filter((item: { name: string; }) => item.name == selectedMethod)[0].inputs;
            paramsSize = inputs.length;

            if (paramsSize > 0) {

                var params: any[] = [];
                var formItems = form.values
                var formKeys = Object.keys(formItems);
                var formVals = Object.values(formItems);
                for (var i = 0; i < formVals.length; i++) {
                    var currKey = formKeys[i];
                    var currVal = formVals[i];
                    if (currKey.startsWith('Item') && currVal != '') {
                        var n = currKey.substring(4, 6)

                        if(inputs[n]) {
                        var attrib = inputs[n]?.name != '' && inputs[n]?.name != undefined ? inputs[n]?.name : inputs[n].type+n;
                         params[attrib] = currVal;
                    }}
                }

                console.log(params);



            }

        }


    }



    return (
        <>
            <Container mt={'1.5rem'} w={'80%'} style={{ justifyContent: 'center' }} fluid>
                <Title order={3} ta="center" c={'white'}>Verify & Recover Wallet</Title>
                <Title order={6} ta="center" c={'dimmed'}>The first on-line live wallet recovery tool </Title>
                <Divider my="xs" c='dimmed' />
            </Container>
            <Container>
                <Card shadow="xs" padding="md" radius="md" withBorder mt={'1rem'} style={{ backgroundColor: 'transparent' }}>

                    <Grid grow mt={'1rem'} justify="center">
                        <Grid.Col span={6}>
                            <Title order={5}>Select the Recovery Options</Title>
                            <Select
                                label=" "
                                readOnly
                                placeholder="Pick Format"
                                defaultValue={'contract'}
                                data={[
                                    { value: 'contract', label: 'Claim/Unstake from Contract' },
                                    { value: 'nft', label: 'NFT Transfer' },]}
                                {...formMain.getInputProps(`recoveryOption`)}
                            /></Grid.Col>
                        <Grid.Col span={6}>
                            <Title order={5}>Contract Address</Title>
                            <TextInput label=" " placeholder="Address"  {...formMain.getInputProps(`destContract`)}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid grow mt={'1rem'} justify="center">
                        <Grid.Col span={12}>
                            <Title order={5}>Paste Call Data</Title>
                            <Textarea label=" " placeholder="Call Data"  {...formMain.getInputProps(`calldata`)} />
                        </Grid.Col>
                    </Grid>
                    <Divider my="xs" c='dimmed' />
                    <Grid >
                        <Grid.Col span={3} style={{ minHeight: rem(80) }}></Grid.Col>
                        <Grid.Col span={3} style={{ minHeight: rem(120) }}></Grid.Col>
                        <Grid.Col span={6} style={{ justifyContent: "flex-end" }} >
                            <Group gap={5} style={{ justifyContent: "flex-end" }} >
                                <Button size="compact-md" color="#6395A7ff" onClick={() => openDrawer()}>Get Call Data</Button>
                                <Button size="compact-md" color="#33B7D1ff">Trigger Recovery</Button>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Card>
            </Container>
            <Drawer opened={opened} onClose={close} title="Generate Call Data" size="27%" zIndex={300}
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                styles={{
                    inner: { fontSize: 20 },
                }}
            >

                <Divider my="xs" c='dimmed' />
                <LoadingOverlay visible={!selectList} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

                <Grid grow mt={'1rem'} justify="center">
                    <Grid.Col span={12} style={{ justifyContent: "flex-end" }} >
                        <Select
                            label="Network"
                            placeholder="Pick value"
                            defaultValue={'1'}
                            readOnly
                            data={[{ value: '1', label: 'ETHEREUM (ETH)' }]}
                        />

                    </Grid.Col>
                    <Grid.Col span={12} style={{ justifyContent: "flex-end" }} >
                        <TextInput label="Compromised Wallet" placeholder="Address"   {...form.getInputProps(`wallet`)} />
                    </Grid.Col>
                    <Grid.Col span={12} style={{ justifyContent: "flex-end" }} >
                        <TextInput label="Compromised Wallet Private Key" placeholder="Private Key"    {...form.getInputProps(`walletPk`)} />
                    </Grid.Col>
                    <Grid.Col span={12} style={{ justifyContent: "flex-end" }} >
                        <TextInput label="Reciever Wallet(New)" placeholder="Address"     {...form.getInputProps(`recvWallet`)} />
                    </Grid.Col>
                    <Grid.Col span={12} style={{ justifyContent: "flex-end" }} >
                        <Select
                            label="Select ABI Method"
                            placeholder="Pick value"
                            data={selectList && selectList}
                            {...form.getInputProps(`selectedMethod`)}
                        />
                    </Grid.Col>
                    {form.isDirty('selectedMethod') && form.values.selectedMethod ? itemsDisplay() : ''}
                    <Grid.Col span={12} style={{ justifyContent: "flex-end" }} >
                        <Button size="compact-md" color="#EC6841ff" fullWidth onClick={() => generateCallData()}>Generate Call Data</Button>

                    </Grid.Col>
                    <Grid.Col span={12} style={{ justifyContent: "flex-end" }} >
                        <Textarea label="Call Data" placeholder="" />

                    </Grid.Col>

                </Grid>
            </Drawer>

        </>
    );
}

export default memo(RecoupePage);

function validateAddress(destContract: string) {

    try {

        return ethers.utils.getContractAddress({ from: destContract, nonce: 0 });

    } catch (Error) {
        return 'Not A Valid Contract';
    }
}
