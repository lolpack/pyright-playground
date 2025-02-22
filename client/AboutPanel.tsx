/*
 * Copyright (c) Eric Traut
 * An "about this app" panel.
 */

import * as icons from '@ant-design/icons-svg';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from './IconButton';
import TextWithLink from './TextWithLink';
import FormfacadeEmbed from "@formfacade/embed-react";

export interface AboutPanelProps {
    code: string;
    getShareableUrl: () => string;
}

export function AboutPanel(props: AboutPanelProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText} selectable={false}>
                {'Try out the feature in the playground'}
            </Text>
            <Text style={styles.aboutText} selectable={false}>
                {
                    'This is a demo version of Pyright with an early release of the Shape Type proposal using Einsum notation.'
                }
            </Text>
            <Text style={styles.aboutText} selectable={false}>
                {
                    'Your feedback will help us refine the demonstration and understand what we should propose as a change to the Python Type System.'
                }
            </Text>
            <TextWithLink
                style={styles.aboutTextLink}
                url={'https://docs.google.com/document/d/1MYnuR0Lwioy266S_i6hVzgSRaOOHN0tBVYgJqDHCG00'}
            >
                {'Python Shape Type Framing Document'}
            </TextWithLink>
            <TextWithLink
                style={styles.aboutTextLink}
                url={'https://docs.google.com/presentation/d/11IKAfpS_ODE_TXmBK4BlVzx4stAcOAECOS-LF_sAzhM/edit#slide=id.g2ff1fef1be1_0_101'}
            >
                {'Python Shape Type Slides'}
            </TextWithLink>
            <TextWithLink
                style={styles.aboutTextLink}
                url={'https://pyright-play.net/'}
            >
                {'Default Pyright Playground'}
            </TextWithLink>
            <View style={styles.divider} />
            <Text style={styles.headerText} selectable={false}>
                {'Sharing a Code Sample'}
            </Text>
            <Text style={styles.aboutText} selectable={false}>
                {'Copy a link or markdown to the clipboard.'}
            </Text>
            <CopyToClipboardButton
                label={'Shareable link'}
                title={'Copy shareable link to clipboard'}
                getTextToCopy={() => {
                    return props.getShareableUrl();
                }}
            />
            <CopyToClipboardButton
                label={'Markdown with link'}
                title={'Copy markdown to clipboard'}
                getTextToCopy={() => {
                    return `Code sample in [pyright playground](${props.getShareableUrl()})\n`;
                }}
            />
            <CopyToClipboardButton
                label={'Markdown with link and code'}
                title={'Copy markdown to clipboard'}
                getTextToCopy={() => {
                    return (
                        `Code sample in [pyright playground](${props.getShareableUrl()})\n\n` +
                        '```' +
                        `python\n${props.code}\n` +
                        '```\n'
                    );
                }}
            />

            <View style={styles.divider} />
            <Text style={styles.headerText} selectable={false}>
                {'Examples'}
            </Text>
            <TextWithLink
                style={styles.aboutTextLink}
                url={
                    '/?code=MQAgKgFglgziMEMC2AHANgU3lVaCeIKATlAHYAucARABIZpoD2IA6o0WgCZUB0AUH04YAZiAj0mAfQDu7LgAoAlAC4%2BIdYRIV5tCczYdOAQiqK%2BQA'
                }
                useSameWindow={true}
            >
                {'Hello World'}
            </TextWithLink>
            <TextWithLink
                style={styles.aboutTextLink}
                url={
                    '/?code=MQAgkgtgDg9gTgFxAgFgUxAOzQdwDQhoAeUacAlhGpggIYA2IAKtQM7zICepIAZnDAhco5TAHMQEGABMArvTQA6AFD9Bw0RMqxEzNvGXLQAETS9RGWn1mYAxgnIxMk2ggjyAjMhSvktANZorMg4MMj6cMG0waJQski0mNIgcGgIsnCYwaho5HAuCBREIFACcvYqoEzoIAACIDCkcK4c5MGyrGjJCGGspLbkvJzeGKw%2BPDC8hLS2KOFZ8AQ46KkgAEREBJxrKWilQdQIUSAATMbz7Pk45Kgg0pRsjlkgxYnJnCrSZgXu9B4AFMoQMCQLQAFx6Bb5eobLZrAigMCYOJIBARUEgHzBMa0Hj-TYgTgASiWKwwryShNBq1ocAARjdmnBhvcqFknqwgSC6RCWFC6utOAQAF47RHI%2BIXDh0zHREA4vFCkDCkkgZZkDDDCCuWZBEbytC2JzJVmPJwNKZo-m0FREkAAWgAfJDLgLYcq1hCqjUYPEUVL8lj5eMMPiRarluRZiA2vrUqx5EhJpJE%2BQoPROJoA8c3iA6SoQSBFMXDCYzBYMbwbPYnj95CdvL46IFsqFs6CYhKEpTUulMtl0HkCkUSmVZPYCHTJddbolQdJ7g4nAwQEasoVaKIEJ9vtq3PXAYXwS6ODCiB4th54cDxf6ra6rEGFaHz5eI2SXl5c5wvzT6YzaRZB52ScVgC25Xl0TPE4thOHZBkJLwAF4kJeBtb0le9pVlbEQxAfEYMJE5VSnJNMAzGMph-QgAEdZAYYIiEItgMizVAmxqLDIlXOc6QwX4HHTcgultB1nT5V0zwvIjPRAb0MF9BA73RJ88PxaTOGI0kozmWMcl2BN6CTKYBLTDM2IiHNKXzLlgWLFQjBAUxzGwStqyXZxYBwRskGaNo9SsOlogwAA3BhZAwHoMTEcgQuoQgSCcQ5J2nG45isNdWA3LcGmcfSgs6EAwvoCLKmYGoCtC8L%2BI6JA%2BNBZwtzQMQyBAMRUlcVr2OcAAGAhUn2ToaC6PNhn01IXLQNkkA2eCpmKZ0ep3KYvMPblgohHKzzml4QEWggQFshKoE2mhlDtJ0YxoMEjvsoA'
                }
                useSameWindow={true}
            >
                {'Matrix Mulitplication'}
            </TextWithLink>
            <TextWithLink
                style={styles.aboutTextLink}
                url={
                    '/?code=MQAgIgpgZglgdhEBDEAna8IFsJwC4h4CeADolAPaogCucMeAzgDQgDuAFjAMYcgyNkIRnlTwA5mgwIc%2BAHQAoUABUugpABsNFNoJqC8FEN3RI8iYmQMczydFJFju5gCaEjjMtxixutegQAbpo0EIyKCtwaSIyCAKoBjAAUAMqiAErS2Lh4AJQAXAogxSCgcuUgSTBYJBrZ%2BGYwFHAgLhB4SDAaghRYDK65CkogAMKm5kKWiJowMSCU1Egt8ObiENTBGqHsDHwodAwgFFAgOOao4QpTIACS%2BACy7euCALz8%2BCAAAiAJDMmboReACIzs8gbliqBMrAEO8CIYjnANERkFodCAAWEdng%2BKDqAcmENQGMIGZpoRSNMNLNBAtkMt8BA1hsQog2LshASjiciEhUC5Ltc7ngAJp8gUgN4rL4-RJJTHA3n8xjgyEgaGYOHuRHI1HaNgY1mCdk4kBKtwExhE0bjcnXGZzOkoKDaRpwcQAWhIFGlmOxe38h2OpyeF0U1wAYq68I9zq95tGZb8mPLWcC8SqIaV1VkExRbAjmrrNPrDVssSbcaHA4ThgBBWIwcQtFB%2BhGBACM-opZFuD1D4RAqgE-HUaLYEDcACMINwkPoLBxEH6AMzGJYgGfrkTa4Wx56KTv5PsxgeS7d4JJ7gesFdZ0AAeQA0se13OWlu5zuEde49a63g5g1PCRgxIwTYtmW2ztgATN2Qr9nGrBTjQ8JLlBiA2AYlInmKyqKCoag7FoDg0BoBDwPSIDrKgVCbrO86MIgwp4RK75wBQBCfjEIEnvuYYKIEMHHr%2Bzznl%2Bl4seKLAgHeaoAKKoLRqAifgrGCOxnH0Reu6Ic8-6Ns2QhtkYgRrpWPaIFG%2BannGchDkRI4ljok70XOC58We77aRJ2rWWY-GXGZx7%2BbZYlvBJV56Rct73iAz6qWFFzrh%2BiC%2BQioWBf%2BgHYCQvFgRBxmstqgQACzwThokxZuqGEOhfpYZZICZQOBEOSO7IkegjBkRRLYtDRdEzu5THNdGgUpRxXFpTxulJUFpWJRNEU8UkLVIbJcWKcpIXjV5SxTT5s0-tFjBAA'
                }
                useSameWindow={true}
            >
                {'Refinement Types With Strings'}
            </TextWithLink>
            <TextWithLink
                style={styles.aboutTextLink}
                url={
                    '/?code=MQAgkgtgDg9gTgFxAgFgUxAOzQdwDQhoAeUacAlhGpggIYA2IAKtQM7zICepIAZnDAhco5TAHMQEGABMArvTQA6AFD9Bw0RMqxEzNvGXLQAETS9RGWiADGMTADcY9WQnJ2GWNLLgfsCHPAA1iAAFADCAHIRAJSSMmj0ytJmNnb2AEzSIcoguSCgYJhQLgBcyPpwIDjkqCCsKLQ8IZgE1gD6ogQoHS1VPdE5eaLFCGUsmOyVAAIgAES97Z0g3Us4PbN4g7mgAOpo5GIoo%2BUTHNW19Y0YIe0wLgRicASBAAzPAIyx5LwgjyAAvDYeiAAPQg35bKr7Q7HcaTEAzWa3e6-J4gV4fEDfVEAoGiUHgsQbSGgABC5ForDKCAqVRqKDqDSayIQsQ4ETsaAIyV4tHkSHIrBAHOwkIARhSqXpTtM5iy8LMQAAfYWc3EirkkkAAZQQFGSZVENLEZBO8PODMuTVYbzqnxAHAQsigCgdPyNaBNcFY3LMfPoAqF70hrD15ANWJoCLmNsViNY70VKqdLrQAG0jdHZrGCJn44mALq496bPL5EAABVo0mkmkNNE9pppMrpFyZ1ygtqg9sdztdMHdDa9PpAPP9gZAL0hUGrtfE9aQiM7cbm3aTyD76bzq5eG0ji9Xhdxby1xnI9ForjsC8blWb5vpjKuoWktukPbvm7d%2B9vI7H-KxINIVrC8r0wBcs1fFdZnfdcUwUDMo0RKDcyQuZYKLQESy1ABxARnSlD0vTNM5Hyta4xGiX1eQAwUQGDMtHjuKBCLQ2YiWLUs8lAAAlNAnTgTBhDQMo7gQEYSMqC0bAYax5EvNBpCfUhIQAWgAPlCSEy1AAB5FwJPvUi22fZpWjaMSugslE1jEgYyzLOEOERBZrIQAgQhWISAGoQHSEAACoQE7EBVNHF5AtCV5Qvo2IwvtME6gi3yS1CNZ8V8-ygu7GL30ikJAneGL7Xi2JEoTEAUtmSEBmiEpIUURqgA'
                }
                useSameWindow={true}
            >
                {'Convolutional Neural Network (CNN) Model'}
            </TextWithLink>
            <TextWithLink
                style={styles.aboutTextLink}
                url={
                    '/?code=GYJw9gtgBALgngBwJYDsDmUkQWEMogCmAboQIYA2A%2BvAoQFCiSyEoDOuFSARgIybZc%2BACqsOIADRQ6ICAFcYDegGIoAEULBUhKGSjA5KAMYwkYFLDAs2%2BRe1xQwMsqfNsoAdyQwAFlDZ0RkhaRv4%2BZHRsAHT0ACaa1jC8ABT0UOlQqsI%2BOoA4BAACgLgEjs4wDmTAiiC6ULncZGw6tITFAYRBWoTuerlEWiiEEKwwxeaw4baIDBmZUACqjSAAtAjgxEjxsf5wENxgXKEoZEPu8WxGIDw6sVhiZuyOwDV24mkZqAgKvABcUKL21XyUAARNwpGwpMRgRI3ulVBojBQyERMChPjAAEy6bp-MQOLy%2BKA3Ibse7uJHcQgUQhbUFSXjgyHAmIzD4KDG-f7iKBAulQBn%2BJkwmbw9pIlFsmAAZmxNS5%2BO8fmJdzcUApVJpILBUGI4OZsNR6KlnLxgK1kL1MIAlN8DURSJQaFNkpLeFa4YaviaATzzYKdcC7SRyNRmi60ez3bNJRzcT7edqBRCA-QDaoAMowFxIUJGMDxXRHChwABehGqRjIFiIDTGZD2CjCESaICrbGAuAgbCDbH4AF5PUkoABqQcYoMO0POoi9qOqGc-OPchNSbXJqGpkVQACCMEU2FsVjIsS2rsLp4j0qkHh8Ob8yJ0KDA%2BBuRBMxag3HAx8rNnr1JZDIMyQMsoAgJA2AgFwjByboUUrOQ0B8fAqy2IgcDwTVUHGHQaW8XAeyxAcz1HSUZVmAA5Z9P2-WJfyzbhqU3d5LylKh1kIDw%2BzIqIOI8cN0V4KI2HCOgAG0AAYAF0pCWN0JxDJ06AEhQ2L490slNX0%2BXcAAqAMgA'
                }
                useSameWindow={true}
            >
                {'Transforms and Size Mismatches'}
            </TextWithLink>
            <TextWithLink
                style={styles.aboutTextLink}
                url={
                    '/?code=GYJw9gtgBALgngBwJYDsDmUkQWEMoAqArggDYCmANFAKopJgrVgBu5IpYAhgCbUjk2XUgH14CcgChJAYigBRAB5dsFKAAU4BXAGMAFlADOMIgCMoPcsFRIYDFIck7SXQ4di69ALklQ-UZ1d3AnIHXB9-SIsrKBERGxg4gApDclJgakM9LgkvQhIKAG1UGGoAOgqAXQBKKABaAD4oADlGcgiozoAiHt9OqIBJejthJAAvciguWFDDXCgAd1sDabQkNhQjbIky6X6ogEEQNEMO-b8snMmk4jJyYpRSqAqymryCPUnLiSgwYFhPjMwiBdud-D0un0wal0mVvpMALxbK57foAAVY7E4vChUUs-xYSHICxSaQyyNy%2BTuDyeLxq9SaAHIYJ4yiFgVA0VAuqZMlAAFRQFhdRlnc4vVGdfFCokkmHk%2BHvAr3ErlKq1RpQZms9lzECi3H7CGG-oAJXIJhAm2mKGJQL1i2WAK%2BKkmPC4MGmpiI%2BGmPCQwGA7FC%2BHhuxNnSOJzF%2B3hUBuyppate1XegNtCwpkz%2BzvtuHDYL85stDhj-RZIH0bNm4SgBygGbzIEdMAMrZdEDdHq9PqmFgDQYEjyzoMLxsLUAEJY8lb01eBKW25GqkqiGLYHG4PAj0X%2BEhAEB95FJ6Wo-ogpypRVVz3VDK1FaruvmXJ5mWowoNE4lO%2Bl%2B8PMDHvKZ5YJetzXo8yb0pq2qzvOepfmOvQTuo7AAZM7b9p2Dj2O4OaYYBwIFoWUanDukTnu4CbUjedKpoQ6Z2rgljNvhgLnrMuHEWCxZEFaZETo%2Bc7PiAeT1o2hEOksra5v%2BR48FhnGMIYo5guOhZyAMqjkNh%2BByZ6diMFAnBrDoUCfAI5H%2BFOfGbEJ8G4CewBwkuK47uuWJbr%2BMRxLwPDJMBvztqJD46jWzavryUAAIzvkKIoaky9kiZy3JRVFhgfiKZadD%2B%2BzSr5PD%2BSITnMMFeSwU%2B4WMoloVwSJiFqchJFFbACxgE27hpDpIZ1EsqTcecpE5VEYDBfGyXhfRHzZuNknzCyUxFYN%2By8fxI2RJNwJiQ2drzc20ltoChhENAbEYe1mAoAgvb7SpVl%2BOpYKadpulLf6hmbCZSBmRZUgTjZVozlVC7yi5VxuflPkiGgFq2DpAVktQqCWIoeR0PYSZGKQP3kNBSVhcCjXnE95wAOIWn2J2mKk%2BDnU2K39MND1Xaj8YY4wWOGDjOh49NgIo%2BQii-M23O4x4UCwzAjOdGtpYs1teo7RJ4UtkdXxmLTvz-JhuBIGsKDCAzLOk-sL13G9guKKgGDfb9wYs4DdmE3qTngxIbmyFAAAiVioJM0zAEQKA6J9EuAcYTa-PuHq4WrRgSDoAY-Vm93ShHMDRUkuJyDNUCADgEaKALgE0fsB68xcMAgHNtM%2BemK4GGIOQJeGInyfkO4tcCNYtq6SXRmth6sBNzntCpCAdQIOAhKWAphhwBAphgDzDauu4liGDoIBIKYbpYEpDja32%2B24qgN2Z3kisvmlcXCpQo%2B%2B4EAhXefABMUyd4QquHYpOHKcZXBd4UAUm%2BGKt8uiqRfj6V%2Bl8XbX1AbFIwWV76RDkI-Fwz8z4%2BgAMwfz7ClH%2BHE-6HxcEA8gICoosEyBA0%2B10cGwPqqrSKH5qH31TLiAQQhRDiGPFgzOtQoByD4dFBhIMHTMKQfFDhghyDCDEE3JIfDX4CKEXQmAMDgbCSYTfMBkjhSrjkAAZQMinHQYBLBTENqQOAExmw6C4JsAQrgjKALAL2OMMAQAOMMMAXAF5pGGGilAJEwioAAGooHqOkVw%2BREgkgCECSoycHcRGaIchFHRGUsoGLrDAQC2B8CLT8pEoJDiFJ8OwdQBYegforGfigMa-YBCh2sVAUw4BeD2OMIAigkCjHjEmBAJAhgIAen0B3KYz97FEDQHoX0KAFICBwHgchV1czkNsLgAJ78QlqKCREipfg5CtHwO0rcXTPSmAoKuCpIhCR2l2efbBZR7kkmEe7e4AAGSo1A6jRRXJEThsjuEKNua8pJV8MmgPcIKfRo8aCpCgPpDCHVPHeJwIizCLhI4wEukQwwcccwVMgbc5FClHk4LKMipInzqCv2oP86JwLYm8LUdgkQZKIVwKhVkqRo9WiZlCWUyJ7KyWTMmGczprhLm9ICbgilmdwkio5WheSTK5E8PiR3bBXLGEcgkZlPlQA'
                }
                useSameWindow={true}
            >
                {'PyTorch'}
            </TextWithLink>

            <View style={styles.divider} />
            <Text style={styles.headerText} selectable={false}>
                {'Pyright'}
            </Text>
            <Text style={styles.aboutText} selectable={false}>
                {'Pyright is an open-source standards-based static type checker for Python.'}
            </Text>
            <TextWithLink
                style={styles.aboutTextLink}
                url={'https://microsoft.github.io/pyright/#/'}
            >
                {'Pyright documentation'}
            </TextWithLink>
            <TextWithLink style={styles.aboutTextLink} url={'https://github.com/Microsoft/pyright'}>
                {'Pyright GitHub site'}
            </TextWithLink>
            <View style={styles.divider} />
            <View style={styles.container}>
            <FormfacadeEmbed
                formFacadeURL="https://formfacade.com/include/109788989504237928448/form/1FAIpQLSe2w9o1tl5rCydJmfPnDMdzDyyo4uKfOlIzhiCJ-sJRndke1g/classic.js/?div=ff-compose"
                onSubmitForm={() => console.log('Form submitted')}
            />
            </View>
        </View>

    );
}

interface CopyToClipboardButtonProps {
    label: string;
    title: string;
    getTextToCopy: () => string;
}

interface CopyToClipboardButtonState {
    isCopied: boolean;
}

function CopyToClipboardButton(props: CopyToClipboardButtonProps) {
    const [buttonState, setButtonState] = useState<CopyToClipboardButtonState>({ isCopied: false });

    return (
        <View style={styles.clipboardContainer}>
            <IconButton
                title={props.title}
                iconDefinition={buttonState.isCopied ? icons.CheckOutlined : icons.CopyOutlined}
                iconSize={16}
                onPress={() => {
                    const textToCopy = props.getTextToCopy();

                    try {
                        navigator.clipboard.writeText(textToCopy);

                        setButtonState({ isCopied: true });

                        setTimeout(() => {
                            setButtonState({ isCopied: false });
                        }, 1000);
                    } catch {
                        // Ignore the error.
                    }
                }}
                color={buttonState.isCopied ? '#090' : '#666'}
                hoverColor={buttonState.isCopied ? '#090' : '#333'}
                backgroundStyle={styles.clipboardButtonBackground}
                hoverBackgroundStyle={styles.clipboardButtonBackgroundHover}
            />
            <Text style={styles.clipboardButtonText} selectable={false}>
                {props.label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    headerText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontVariant: ['small-caps'],
    },
    aboutTextLink: {
        marginLeft: 16,
        marginRight: 8,
        fontSize: 13,
        marginBottom: 8,
    },
    aboutText: {
        marginLeft: 16,
        marginRight: 8,
        fontSize: 13,
        color: '#333',
        marginBottom: 8,
    },
    divider: {
        height: 1,
        borderTopWidth: 1,
        borderColor: '#eee',
        borderStyle: 'solid',
        marginVertical: 8,
    },
    clipboardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 4,
    },
    clipboardButtonBackground: {
        height: 26,
        width: 26,
        paddingVertical: 4,
        paddingHorizontal: 4,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        borderColor: '#999',
    },
    clipboardButtonBackgroundHover: {
        borderColor: '#666',
    },
    clipboardButtonText: {
        marginLeft: 8,
        fontSize: 13,
        color: '#333',
        marginBottom: 2,
    },
});
