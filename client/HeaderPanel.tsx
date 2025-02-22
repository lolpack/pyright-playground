/*
 * Copyright (c) Eric Traut
 * Header bar with embedded controls for the playground.
 */

import * as icons from '@ant-design/icons-svg';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAssets } from 'expo-asset';
import IconButton from './IconButton';
import { RightPanelType } from './RightPanel';

const headerIconButtonSize = 20;

export interface HeaderPanelProps {
    isRightPanelDisplayed: boolean;
    rightPanelType: RightPanelType;
    onShowRightPanel: (rightPanelType?: RightPanelType) => void;
}

export function HeaderPanel(props: HeaderPanelProps) {
    const [assets, error] = useAssets([require('./assets/pyright_bw.png')]);

    let image = null;
    if (!error && assets) {
        image = <Image style={styles.pyrightIcon} source={assets[0]} />;
    } else {
        image = <View style={styles.pyrightIcon} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Pressable
                    onPress={() => {
                        Linking.openURL('https://github.com/microsoft/pyright');
                    }}
                >
                    {image}
                </Pressable>
                <Text style={styles.titleText} selectable={false}>
                    [Experimental] Pyright Playground For Shape Types
                </Text>
                <View style={styles.controlsPanel}>
                    <IconButton
                        iconDefinition={icons.SettingOutlined}
                        iconSize={headerIconButtonSize}
                        disabled={
                            props.isRightPanelDisplayed &&
                            props.rightPanelType === RightPanelType.Settings
                        }
                        color={'#fff'}
                        hoverColor={'#eee'}
                        disableColor={'#669'}
                        title={'Playground settings'}
                        onPress={() => {
                            props.onShowRightPanel(RightPanelType.Settings);
                        }}
                    />
                    <IconButton
                        iconDefinition={icons.QuestionCircleOutlined}
                        iconSize={headerIconButtonSize}
                        disabled={
                            props.isRightPanelDisplayed && props.rightPanelType === RightPanelType.About
                        }
                        color={'#fff'}
                        hoverColor={'#eee'}
                        disableColor={'#669'}
                        title={'About Pyright Playground'}
                        onPress={() => {
                            props.onShowRightPanel(RightPanelType.About);
                        }}
                    />
                </View>
            </View>
            <Text style={styles.warningText} selectable={false}>
                Try examples of the new shape types syntax and give feedback in the form on the right
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: -1,
        flexDirection: 'column',
        paddingHorizontal: 8,
        paddingBottom: 2,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        backgroundColor: '#336',
        height: 'auto',
    },
    topRow: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'flex-start',
    },
    pyrightIcon: {
        height: 24,
        width: 24,
        marginRight: 8,
    },
    titleText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        fontVariant: ['small-caps'],
    },
    controlsPanel: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 'auto',
    },
    warningText: {
        color: '#ff9900',
        fontSize: 16,
        paddingHorizontal: 8,
        fontWeight: 'normal',
        fontVariant: ['small-caps'],
        marginTop: 4,
        marginBottom: 4,
    },
});
