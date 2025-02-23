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
                    'This is an early demo version of Pyright with an in-progress example of what Shape Types in Python could look like using TypeVars.'
                }
            </Text>
            <Text style={styles.aboutText} selectable={false}>
                {
                    'There is a good amount to be worked out before this can turn into a PEP. We would like to get feedback on the syntax generally and whether having shape checking like this will help solve tensor mismatch challenges for AI/ML developers.'
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
                   '/?code=MQAgKgFglgziMEMC2AHANgUxAFwzbcAbggE5QD2ArnAjChgMYEjkBmOGAdjOSfBAno4AnkIYRGAayicA5gDoAUKACS2ENTwgEIBtWzkkHbrxBooAIxKlhOciGLmAJglzGefcvWvYK3bZxOIFysvAwYyvyCWAzk3NjWMszUMrLw2K5QDCJiEgzSciAA7lDYECAACsJkshDqCIGVwmVxAORw2KJY0JwESpEAIrAIFphNNXXFpJypIKF8SLAws0jkTpRjPJQk4TCRKNVQtdgAXCAkGCi82ACyS6k3axsYAMpUOxgAvKwIaDARilYJEM7l45gsICgqGuIBeUAAXhgADTgLgeFFIVxIDYo6yBTggECqaEkdQXACOlCgFyCuBMfE69BojVYlE4TD8eyBIMZqQA%2BhgAB505ZxOBQq6kkAAGVKGGsaBUvUJKtVxMl6lluAVSvUBnOeASWT1XQcpCgI0wHXsSQwsnlZjlCr2ikUTgw7FZ7IAjABtAYogCCZy18t%2BupRACEQ07w70UQBhGPauPYAC6AApFKqEGcwGjeP6UdhKOgML7A1G02mUUTUfSQK0EK1iqVyjABEIM5WQJGAJTZlUWPMFkhFnClzC%2ByOJ6u10D5hutCwtkplKJdmcgBMD1UMEf08clsvTqtplUL0eNhirtvaeCU0hYDvREAZrf9xR9k6DwmgG4bL46C2CKphNi2DS0ley6tEoaogAAooK9BMBgQQXDAgEHh4rbri%2BXY9jucEqoQ3ogJ8ICYtg2JoBmCAohYu4qhchAYL8fKMhgGakSiQoobgTgcUK2CfAARIuHhHpO5aEdWokDr%2BdYAWgQFoCB0HNgEQQwI%2BFygnwrQ3sRf6IchjACQamEqdhphru2nZYN2UZ9iAFiMAgmjXi2AhwPhjkfn2xkOAATORlFYhsdEogwTGEixbFoBxXTccFvFmahgm4MKYkSYWAYTiePaRnJCnwcpqm2DplBPvpXm4eUpT-GgrBBaASH8WhllYfWOF2Ru-nOUFhAAMxhVRNEZgw0WxQarHsZx3HDWlHWZcJOWjlJJ4fiVrplYBUDAQ%2B1V6aBBk3lptUwa1pkrV11k9bZd5%2BW%2BW5EYphAACxjRFtFTa5M3xfNyWfct5loUJ2XiRt%2BXHlOr07YpC4SHM5BoGg5AlIUNGqVkmRivwVBoEE9qcGGbiccEJDAiQcDrFg%2BoyLEqCZKMz4OTA-TwQhVO8Gc5UHWpsynXVGZ%2BWcp69mmLl9cL4FvmLIAVlWLmwJCnCOFAThDQArN91GRX9CClReiE8yQfP7cBQvQSu8sOeL8PS3esuaaL9uK0VUuQuK6u-JrQ0AGx6xNFgokbrpuh6cxsgwwW%2BgAGsmYaKvGIAAJpJzqqcAFqZ6mmaEGccKIr6sPlvHKJpyi2fVt%2BiMgAAqpwKAIPkODI8XWDkBYABW5lq-qZQXM%2BlykK4WCOJQeBBfRrnRWFhD1wmcSsNSRhlK47dYGyLf5J1k9aAIrFb7ovAXEwjopmgOTT4pgOJQts98WDq2Q-H8l3xgc0P8lofBOlAkIYiVEmnD%2Bqp75JXoJNUGGUgFiWzh-euTdd6SA0MsQowkuDuiCDvVuBRZBnFXjTdQGBMBIC4PURoZQsAYXUGwE%2BpCMDkN6BzRSTgUQACpBQL0-t-SBXF2H-xWnA0S78ZqgFaIKFsHZCZBDcvecw%2BBT69AQDIIWyMLiYjURgshFC4AZk4nANOF1s6BV4QlfhGZBQwMAVlYBijsC%2BmMQAHxADXRB8FkF4PqpRS2YxaDLFkJwZhBBCHUiUdgIo9hGEhJgGHSimsnBjAcWHKhyM0C0BIbo3oQVJAoh7pwpAKICQUUXuAr%2BFiFp5KES-ERYjzFAygQUmpsC7FiVAeI2EjN6YSD0jVIUrdsBqXbsPYI2SCAolaEgaREBZGuSwA0YIqBOiOnwEFCBC0iktNsWtUSDjfQADkKkkDTGA5iFTGlcU4DY8GbTRIIIUpHT0MdhoZjrvBBMFxx73jxE4HkV4%2BrPQzN6FEH0UTazMaqbAZEKK-M4MC0F4LOkACULnX2oWrVg8oaQ3xYOwaF6y0WWOhZ05enAiHrwEHqZGp12jnAaKgjMnBKBIDcp4dgTgoRok5CrOAsQqbmWGZrChUBV6dVoCAYahK%2BELQJXiapz9Wm7NDAqX0w1TkDiAA'
                }
                useSameWindow={true}
            >
                {'Shape Checking - Constraints'}
            </TextWithLink>
            <TextWithLink
                style={styles.aboutTextLink}
                url={
                    '/?code=MQAgYglgNgpgXCALjAzog%2Bsgdig9gJ3RQAsBDABxkwE9L0BjYmegawiwHMA6c6gKFAAVYhBQgAZtBhJUiMQDdS%2BCLgCuY0ikr05IXOJk4CIEhWmJa0xszacANAJDt6UVQBN2HCaqw6VWEA4YLBhlehQ7JFVyWBAfclJWT0j2NxgAD2SQelxfUmx8-wdQHKx5XFdEfz1KfELciJBSLDcQfBg3VT9ckAAKFFUAWwBKGtD6nC4BR15lDmJEBHbyAkQAWVEUTzXcTtgAZTV8ehgAXnFSKBQYPj5xfFxBpFpPJ0GV-EQQAEEsakiADIQZB1KCRACqWASrDuDyeFnInnQGWwWwabw%2BXyBIMuAEksIhAcDxlB8YhBNFYLDHoY8PgoBAAEYY1YgfYQABeMEigmCdMi9HyAty8gATG5InUWlhIgNBrdHGAfN0AohcCYIO8oNQ2jBEKp8KqmCZSINzHzjKZKE4vu0ThB5KgpqAAOLBUIQeggBJ1M0gsQADSaLRAAE0mu0QBltMhWmqQIzpAycVAnASYEF8CgpmkDOJlQBGADaAYQ2JJZMiobLxNBZIAur10gh2Vyi-qYjAS1X6-XRgBaAB8bM5XY7sG7Yd7cD4IDnuv1hpA6QVQlkYgRViYSU4EmMqMtZGtWy5YkZOviiVsXnHTscuK%2BaUGDUQdWQYnID1qz2t7HEoWCE5g1adhsCqXJLijfAHizHMYDzZVRRLGsUwbXpZ3nFACxbUd20pLty1BIsC3rIkUyLUVe1IkxRRwttbyLQjLmI6imKgCjqIDXs%2BGGGd5xAUBvkQZB3iqXd4wSFANA1LkQAAd2BYgQAAZijWAzQJDd1XzXwC3kkRGCjdIYzEUU1JgDS5CmfihBEMQSDUKBWiCEI32kUgf2kUIYOs%2BcdPoAt%2BlFYZbhskAAGECDtL51FIIIEEkrZdywyIPNFfsYHU4IvhPGBfLneQ9NObxdP6AsQv49pHUuGhKF6QrImjZhY0wFFTgAIlbMd8MY2tmJIsiSQ43t2pCjC51ASFoWvEw9NA9VEDk9VFGUUhGVgbNxuXAtImoIrZq2qqYBqzcmx2oyYw6Vr0kQDq2JY0bDpgaqoFqmBej2xrjOaq7kBuu6%2BvYyjHq20B8RyaDmriKEr08BBX2oV540vVgQDMzKLOysR5qQYh2mkFaIDWjb8oEkBhFEExiEc5z3Tc4MoJ8rb0lFXbWZADkzOKrDQvnSaYZ3LwUFoiQICzL4McstN43SVTmjjY12jQaX1Q8hk0FJ2XIgAKlwRAmHwVTudFJ6XreptlK%2By63Gu272vukjHsq57jte069YNy2Lp%2Bm2-rt9XEBLEAAB8QHuyj6xBxxeTQbGWgyV4en180jHwKmzDiJKvBWLYqkdYCQBCDhCnz1JPTvMGvkuPBsm3FgNzIL41EQft9H7KUgjTDwTg-B5OiA7yCE23Mu4yYtvhQisCUiAAhSe62niL57xAlGy2xBsPJi18CLX5-iiTtd9nyJwt7BxeK2rCQGKjeuCtG5nbN06Uu9nRfrazrcIY75j4ikaxrCviNImRxLGn1mLVoktsp9FSBkNGFVMJc1mhxU2rtzbCytj7W2HVwog0AfHEBXgFL60LhmEu0hYHpD3GnZOotxbmUsqTFARtkH9mUvWVBJ1LD9C9k1N%2BvsP7fDwXzcmTBrhUxpoEOm%2BQvLQSHiATo5h1TsEUAyECLRy6bX4igAALNfVhOiOHaIAKz6KwkWQxq4t6x1HoQvQqpt7p0oGIYhSlmjQ2mh0A%2BsR9B6GTmnDwGk0STD4CPShSEJ5h0BpWEAc8omoUXgAeX8cvUkBIKSdjXvxDeCBeSp13n8SI39f5TSvEWZJBsqLnz4phfat976cLdtwl%2BfCWp%2Bw6l1PCh8f6xJ1hU0I-9eYTRAEAhOyVtAQEkF6KBml5KKXYLjcw%2BEmFIPMZRRp6D2atPfv9dqGTYCjPSF0icPSZ59P8axQGw1hFzmYWY4sbCjHziOlwuqzDMH8OwXs-ChzjldlOecypg0iKPMjgAzCejuYPMsY-NBz8dEfLaR-fZMBfnFN6SAbW-T8CXPIv2QxYKhkmFMVCixTy5wvKaW84xiKdl2xRWinqALMXYtxUNAlNyybhTrkjRuiy6HK0WuqGZugIZKxWCGeM3wC4zyYQANnuUWAADOS3UT9mlytpQI3ZQjwW3IAOyKpIhs5%2B%2BqtVfJnlHNcNiDxp1KIKAo4EAiXFyF4DyWhmCTIgF4wJfJ-DOhGV8VREA3AyIbvkbIuQHXBAmLqAYUBdALNoWKqGOR3iqFjE4vKoT4KRryBvXeqSYlxLYjE8KRbV7oWyZvPJdICn73RWcv%2B1FEAi1rQQetRSmXAv6tRU%2BHCL5hUivmmNYk3VQFdQozUfqegFgANyxLTPQdomhUAJh1AWJh%2B0HW9F6BvIpwVIiBNOOVE1zTzrbO1fS7enbvH-MiGSb4bg3BFibQ7M%2BzbOWgGHdGrAhRxJ6VcUgJakbERrt8a2hdM8l0ruuGeHUooVn6J3Xu86raD3DCPZqE9CCKUu1ee9DBr8kW7PbTvPeXbukPoJE%2Bl9b6rkRxPoM0GojUBWEuFcCRqgnJSNcjIxm8jFFIHVIMTYic04qMuCGqdQTqhKA4EMLGTCWEof3Ugdmrbhi4ZMJC7I%2BRd1qfQ%2BpzDMnTjBUviSvTiADNoY04e0z-ZT3aIVcVVTtmMNYcGKcYxY1o7riaHm8olRqi4FqLGnoooAAiCj8geSAx6%2BgXqvE%2BlNHqUIm1bJeW%2BvwvQGbyAZqzU4MQgooD0G4zI1o9waS0PYPlnKR5uQgBYKEEIqZcqpRDKUILGbqj4G43eEeXXixbQAHIVsJFtcK7BxsOH4pFDNM2tqlniVPCb-FqwrYXmt%2BcABpZsm2V7bbnDt6gi2snzlqwtre%2BSKN3qLCNk%2B7AqyRC4qRLackYAQHmIsa7dbbsMXm4SCKT2QAnciHts%2BPEalzgCshkU4peiXaBx9r7CxtOUvNltfiAVZv8XnJer5ZHb0MQexFZu1HEC0aLGSfYqhGRFlDOD6gbKiIkWoo%2B591OCS0-pwGcH6QWe9qou1XHc5fPWt0B5LrFQes9FC%2BMJ1cySEeUkOkLxaBlBpDggYLrSEtoluidPSbi3%2BIAAkTfzgAOoW7nGATepajf8TACLB3E3Gz7aJ-9nqTbwqRFN5ES3H7JAJvS7km9XvD6%2B4ipEO3MeI6DueXqA0ARdduCbJEYP-pZSvhDWccztxQBKk%2BAbGQNiejS%2BCz0dQrwpRuGq9vDLgbM5rt10rpShM1BxzqzJNd8sQDBtDe%2BflStuNjqzdrwLylegJ7nJn9L%2Bja9YF6AikAK%2BaUgB82euqWO-LQCzzvucBP2l7PD4Uu791DE9vYpfg77FjGC7v8L0XIA9XZCVXDsoopeiL96OdNfkQfMM8990t0d8MqV3oD839n9%2BIj9kVT8G0ep30r8yVkCBpb8WIRpn9X9YdXN4dv95Yl8-9IhlJ2YSCTM58sxQD1Vt88d5wcdIDYDSN4DKMJwkD0Cb8HYOCrkCwCVI4sCiV6AkFdd8DpRf9Ig18vYyCgCQ9KCt8IDaCYdWYGDssSNr0bsz8GI2CL8H8KJ79UDeCRctpsCVM8Cf8iC0YAAOSIUUCw8g4A2Q2FAjKtBQ%2BgS2ZQ62QnZg8-bgnQrg8iAsSiVAiOPgowqxGOXQDvdQEwIYQYWNb-DoLoJ1UYeXN8fwMQHoNKaLW1ANB8WuGwcNHKGI14RIB4KSKdcQf8doAkGTGdHAb0PuLoNdS9XLRAbve%2BYeXNOUceGbWJcbRsHJX7DtCPE5WeXsGfMmWnQYUTXcXAR0NODjBhLGeo3YRo6SLOWIVRVQaQXoOSOocgSgdRALW1PQAwe%2BPoHaLTLdMxIYVDKguFc9c1Y-T3DQxAnw5jMKSY6Y8dSdWhJVEhX1HAXrBInuflaVAE4JJDbmG4tTY9JVO4pwojRgtQv7F4w%2BGed4kRHbGAGAREUBaQcE6oOSJgAIOUL4poCdXcWE5Ta4wYVDTzU4JVSIZrHE49QQPrGAeE8AnhR4uA9QhAw%2BNg9EwlFjT44oikm8Y0AsZWAknodofuNdWhaDGUrAJhXTOUOk0zJzRPagwjFfJEjqZ4-kk5DE4ZLEnE3lfE6dQEnoIk4IaIqYsUydY9TdCzGkjU50pk7E8gVk9kzk9BdffUk-Pklg%2B9dAtnYUsKEbMhPOChAhV4JafAeuDUUTKAJQbUeVN0mE7DRzP05%2BTVYjOlA0rw7%2BQZbRQ1KE2krMrzfsczRwrklAM1Asq9Is4Mu7IUr9VjcRErTjBybjWmPjZAATLMBRLY4TNMAfGo60gIMuHuJhCwzM86Y9WszCAATgXPpLYRCiAA'
                }
                useSameWindow={true}
            >
                {'Shape Checking - Generics, Convolutions'}
            </TextWithLink>
            <TextWithLink
                style={styles.aboutTextLink}
                url={
                    '/?code=MQAgKgFglgziMEMC2AHANgUxAFwzbcAbggE5QD2ArnAjChgMYEjkBmOGAdjOSfBAno4AnkIYRGAayicA5gDoAUItAphZWRGwAuECQwpe2ALKwYM2cfIATSpgDKVEgwwBeVgjQwMy1iXJIIigWIFCoRiAAgpyc5NgIuNYANFGcwikAMlC4JJ6KfgFBFgD6GAAeuNwU3KHhJNggAJKc2ACiAI4pzdgA4tiZ2Ri5aN0pAOoS%2Bvn%2BgZU8JGhQAEa1hvXgXPMpi9woCC4puZzWnCky1uXF3phMKfQkSJS4KTDtlBgYAF4YKZTcbx9vspFBd2Et-AhrAxaNgAIwAbUUIGRUV0WRynlGSJRACE0YNhliUSAABr4jEjFpJbHIgDC5KGmKpNJAABEGYTmQBdAAULLhujAm148Oi6RwlHQGFFKRxXK51OJ2AATILhSRRWkUthJZh4SSUpFZfLFSjsABmNXcEVi7W66UGkDoxloeGwhVOgmeN3yhX8gAsumisXiiXhQutGttEql8Odwx9hpStJNIAmQwwPO6HXhtONAEo-UqAKxW%2Baa8U62Px73upNsk38gBsZZtWpjeprrvNHq7ic9FPh-t9puR2AA7K2o%2B2q52va7i735-2%2B4uBoP3Y389oWdZYSBXDhYfIYJQljyVfmWfpCBhPMVsKJM3uUuV6EwMNYH%2BVsK4AEQRuW0azg69Zylyf5XruyoHkeIAALQ4Mq14YLe96PvQPLWMqr5lO%2BiTfhU-6AW2lb2vqYHypByjEtY5qwSqIAANQ4OaKFoWgD5Plh5q4fhn6Eb%2BAHqhWdqxo6RogOB1G7vRh6MYhFrsXenEYc%2BvEgG%2BjAEbgRHCZGokdqBUTGhBUG0f6DEwSx2D%2Bsp6HcdY-p8dpAm6UJJHTmR4mUWZNEoqAkCwPwVBoNYICyFwjK4CACCcJpJD%2BCQSi0cWVkITgxb%2Bci1hNgxeU2eO9mqdxLK0U2o7EppeGuV%2B7nESJwHkauS6Dj264uvCa4Dp1w5UZVUEghg7A7HQ%2BwYAikQcky2C8lAsJBjEcQJJ%2BMpppMmbdH0a19gADPKhbbvy%2B6HqNewuDyu0pLCV0gP6V7EjeKlcZhcIuR%2BdU-g1BmsGg5AJGJc6Dn1fn8jBp0yGNF23c5oSwg9KJPQ5r04dV-GfXpnnwr9-39EZopUeZZrmsUVANIeRwnDyyoI8iSMla9JNk%2B9OlffpQEzs1y7Kr61FKnJIBneNl0pLDqNk64Fqk08tN6Khz1qReGlaR9gnfRz3lA51POE9lICBdAcAwBAoXhZFnDRVgcUJUlKVmpZEO7MLMMpBpEtS2TRPIgbwXG6bEVRbkMXW0Mtv8mljtQ5mLsgLtg2gqExyXNc2mTdNlJ43iPWcrNfLElAU6GSBa3gSkZSF011bLj28qKEdSonYnFxlFcGA3NgPJQCkt1lLL9MvZmb1o7Vavs6RgPSn27VSbrYOwecydt9pnfXWXffy8jg%2BoyrrOY41nOxpJU%2B817%2BvgIbIV2GbgcrbF8Wh7wdtjgLC8tynTAryAqO98CCf3I8uA07ZxmrKdOowQD0mARnXkx0K4Hz1JJHEyYtw7mJCgRu-8niD1hCkHkOCv7d3zOvDiA8eToJZm5NmWNK56iQRAw0s80HgxAJg3AF58EiwISAeGxCFbcRQNvGqqt6pjy8hPNaeYZ6g2JD7I2Jsr4BwtkHK299EqPxZCgAWrDsG4NuqjOOp9ZGXzCooy2d8bbqLQQ7FhQwAE6JAJw1G91DHn19vIkx5szEhzUclDREcbEPCwew3Rq8uHmiIb-Ya8AARfAmqKMBVIpIJNzrAjYBkaHSkQR1BMdYoHwh1n6euKIYCN1eO8WJwSv68M3jyEpFCMYeX3prTJspsnegKTJYkMBmFlMBPY%2BCNNiqkLqcPYRVCmniKyXkjpp8YAC16RUoe8F4ZDMVnM%2Bpo9qHwJaVJNprpcl9hmXrIxfsFGeOUTgAA7uQCxJAYBP3gNYhZ3xKnFlmf4559iVmPQ3gzTMMBiwbJEVs5pO1lwHO5ifSJ7BPnKniVA8BWcuzdBgQ3OBoKpl9ghYOAp1IinIhKbBT5lS8EpBptUv5tT8E70oXvdJ2y4zznAfIFls8hrsD%2BJ8oByLElIqZYkyBPKUlorSRrSZrSIEoJZJQRunKYkvKHt8xGvzSEyqBeM%2BlGK9n9joSmaRKJKDMLleUhV%2BDwmrO4oa9VdKxX4ymZIrFULpUC2NX0ypyyKWquVkI3ejTNXit2fQvJm59XIkoNY11iz8EDM9YrcN1q-W2uLpi8FHo9WQSAA'
                }
                useSameWindow={true}
            >
                {'Shape Checking - Broadcasting'}
            </TextWithLink>
            <TextWithLink
                style={styles.aboutTextLink}
                url={
                    '/?code=MQAgKgFglgziMEMC2AHANgUxAFwzbcAbggE5QD2ArnAjChgMYEjkBmOGAdjOSfBAno4AnkIYRGAayicA5gDoAUItAphZWRGwAuECQwpe2ALKwYM2cfIATSpgDKVEgwwBeVgjQwMy1iXJIIigWIFCoRiAAgpzCADQgADJQuCSein4BQRYA%2BhgAHrjcFNyh4STYickYqWgAkpzY6f6BhTwkaFAARqWG5eBcbcqK1hjs2Kncht4AjADakbpJKZ712PEAQotVNavxABpby3UNALoAFIogVzjTumADvPMx8diU6BjzGycnsZfX2AAmO4PEhPOI4N6YWZ7eJLaqeWYAn6VI6zAAs3x%2BigAlNo-ldrNMQK4bvJxghJuRvGcAAzxabY-F6DCEDCebLYUQYM6E%2BL5ehMDDWDn5bCuABE924j2i4Ne71m63ikW%2B4sZTOsAOJOABZImdCp3LpIAAtAymfpWezOfQeQC%2BXkBbhhbgChKpW0wS9IR84TV0ci-QikftVerriBQJBYPwqGhrCBZFx4bgQBSQNV-CQNQBWbXYaZ6ikG6nGgDM6uGoxAhCgGAA7nMFij4cc1iBNi2dg19odW6tzkyC8DpaDZd6FZEvliI4CR57xxCFTCu8HA9sERjvr9Z2X5zLnkuoUG0AHYRvT9MaevUSHV6ey5jfriNUSSdgy-Jaw2zmj6caADZGQjS02TQDkuQuCMI15DNHUYZ0RTdSUQS9I9fQvM971mK8b1bWYAMxcUmXDa5NXzT9v3rX94jNYDrlA61IM1B0nSFJCxRQ0c0PlY9MIxc9UQA68wyAA'
                }
                useSameWindow={true}
            >
                {'Shape Checking - Transpose'}
            </TextWithLink>
            <TextWithLink
                style={styles.aboutTextLink}
                url={
                    '/?code=MQAgKgFglgziMEMC2AHANgUxAJwy3MGAdgC5wIgkCeKUAxgmpcTAPbYhpQBG2C2VShAQkQSKAHMIogK6EhWaigwAoUDCowSGJJVYgAboygATEYpbt4w5TAB0IAJKjYIORhMhug1iQgYObS0QBkJ7FTUQFCpsSWkALhw8dhIAWVgYKCIJVNYTGUwAZVYZbDoMAF4AM0ZCCKrsVl0lDDgoVBSQAFE0LhRMmDAaVQamyhosiRB2lE6AQSIiX3MTABoQBap1gBkobT40dYBVIhQEOgBrddYDALRWBBMVUeaJ7IB9DAAPbSJM1j%2B0w62FEAAoVCBIU5SHMTGsIVDHKQACJQAyrBGQpEkLoARwxUOhJAA4hgCYjSMSSOSsaRttTMUTUgUaUSAHJkxnYwoybis3b7RjY-l7AJC0hgGToTmEyXSgBCjUeoQZsqlmAAwgCGKqoXLMEiTN9WfqMNtiCb1RhmWgSFBDcbGaaAAoBJAybSW6UAJVaNhleqthXQ9ADkNNhQA7ggUKyAOr%2BXAYgCUEToaAQMDghSgAC8MABtQqJEhWgsCsVoYUgOy1gC6IAqIArB2xprroNL0oLJzOlyLdbryfijKNVRA73eEgwdu0SEnBcciRb4pIHcIaCq6wuGCoiUcyZAAFoAHzgK0Or5F9aOOuJWsOECgaKxKQkRKSJa4Au4WYgpF0E0Zx2twmCpDOEB5AA8rc2CxEadajhg44YJg86ATIpCghuVSHqe57SuaRADvetZphmWbgJY2AFsi6zFpQZYrlWpDrA%2BDZNsxbZWneSHjpOWR7JO2GoVuhiMDIGB4WebIAhgpF2IyAAC%2BCsMoIJUHx1gxhgImbtJIA5vmJE1mRhIqY06nUFpfBEBcem4ceZ6mkRJkPlpJC2TAsyEIuACMy6iq2rFOAATIFgosWu4KEoSOHrCY7QAAz7n5CXtAFGyLMs2gmIuoXrAmAS6RG0YoNeThpWFQ6IYSBlgNRtHrKVMYVY4VWOKFg4KVpBhQBgkYFnMEWVtx0odoycWiesABU-ASDAiQLEsJArD2pznBcQ11oViYlVavowP6FVzDVjL1Y1dEEZgh3HYU6ynXepmKYSY4hKwMAORdfzsE1hlPe5r3IfAWRfU5VE-TRV2FADZlQm9jx5YU4XNkFq7tjFsWQvF0ynB6S3ZatuUFg1kN-cjO0gEVuCgqaioPCYKoVRTya1VC31sFDzVWvTyqZiQzNdbDL3w8Dk6Iwuk1QsjI3BSQpqsuu024yg%2BNZSta2k5z5NdbtxW0zzSqM-zgs1Rzv1XXTRtM-dhlCz1QPjjAvJFijXESjxmNYzjWSq%2B%2B6s5R4JOXfRutU3tBsKtbJu2yzbOQubXPXRgvPG1opvC1pk7O9wC4y6jkVjZgE1Y9jyu%2B2ry2B3lWsW6HlPU-tUcMzb9es%2Bd4O10nVstzH9eZ47USsJGDnrN8KCJFU9wiIn5MD6L-HvLMkbCTj4%2BT9PJCz9D8%2BQm9k7TrOOgLkujHdj0fQDEMyggAAPgXo2kHf8BcOUbH1iXpfxVLkJZEaXz7lZNvbm0obR2kvG1bqz0IhKRuHcBmKg3o6gLIyOijJCiZXdvLK0rJ85YIVlyWWq4MSf0hL8Tmi0A5EyDl2TAwcybQz8pTLuOtBx6xpqaLURBkEYNDjeGqrJEpIH3I2EASVWQzVZCUf2LDLZWi4TwqqyN%2BENnvrJIgWAmwPhTJ3EOycFEiCLEogqTgoHuVgbBaeTwkGGNQbgzBaMooEMJHgxxRcwyGQAMxEKcTgwhD85YkK9swSGlCq7ULyj-M%2BdDZH0SYc1PRFMEkMPop4th4d9acO1IYrJ3DDG8Ltvw1J-DUyEh2qOdoIimziMZJIxk0jEixP0dkgWuTFF8NMcU0xqiQDqM0c9HR%2BEmltJyfIlpRiOm3i6beTOFj4GPEQcDZBdj0EOMLh7aUuC3ZuI2ZgXB3iAnoz8S4gALD49xrJT5YKCYych7AwmEzWlE2hhYmkYOYYksOby0nJO1tDE5bComN0jpqcZIzWljLyQLApyjOleKKYZE5JTFaCMqU4URNTCR1MJA0iGfyQGgqhSTSFyDwUTMKXCwoniEWFCRd05%2BfTRHaJUMA5pRKyVkphSYqZ8LKV0pmT1OZ2ArGLPHMg5EHY7nYEoS8%2BhfzKbsXSsI3GohqmzWuGrWRPTGVaNrNvTOSCAQGFCpEwkaDCRsnOaxRkGokRWt1JCAAEnaw5UV4wuuuTaqCatPWEgANIpVdcKRkfq1mPwdSAYk9rWTEmwNG9BgbfVQmdImnZEbkSpvWRGjB9rRGFExcmsNctREptZMiItq5REZpuYSCuMi9GyrZOsW1RB1jOtbVTJEgLCSRgwHEf24TNYNrLBqb11JI3YHWAGqdTCG4R2xHiAssabwojRAWFt6xiSDlZqybgUBMyNOHd2UdHpBwMrkqIvprItDwXkoZJKz9ZX5riRxEAaVGRnDhJMRIKbH1llLSAZ0TCMWoozHaAEiQM1-u7NWkA5bX3vsJBIRoUpKHElEVVJ8UQYj9o-BIL8hZfwpCREYLgJhr4YAAGr8COIQRCs8VmEllVEptUST0RsJNiWEprS6cdXQYFBvHePchdlEoTFISA8m4IuGEcICztpXWkAo5ZHEFjDim9J2IbS0XEUSKTBZp2uoLLO7t4mhPMWM%2BUszsUrPWelgW8TtnxMWfiVEpzsUuNybExJ1EAnvNYxE9J-zQnAsyZINxgscYkSKe0xZ9Ts6YvKfLYp-ToadiqZM%2B5uzUIXNZbM3l8TvDgsFdirl1kZSUUqANcDP%2B3x3gbgwHQAWjHpb2ucYieNhIAAa8bSEq01Yk9zQiCYa2Jo4dhTcDREH-pAndjJasALxXXaJhYuuAtZRGEM5Q2rpcipZ9Ysq1tmLIm9Lgfw%2ByrejXB0RU8HjRUZFofg-tbsiFZMQEwG87vXu0P0Eb1cCxdYm6CbEVIAe7crAWJK273PYqhLipph2z1qIvU2K9LLdEpJWwD47ilTusAWhdgHV3kQ3c3n1x7IJPuvcZO9qnEatB4AeaNoOgOMk0xBwLVnFmocCNqVIgbmPEfapR70uSgznJHroUdnqb0kAiHdGgQTUJzVQi6xWt1jIACa6vg3de2Vm1kmv9fhprVCBAh7BdljV%2BsbX6TuB-YiXK5bh2TFG-ScChduIAeu6Ye3Vlh2qpu%2Bq%2BOdS7ptDkzazgpwkfxrBLrRb-F-0lVM-%2B%2BNtnk2MCumwGHwsttbx%2B4x4nl0boPS55UYKuBwqEFvVsiYYiDF8GezmtgBaiReybQHAlFoiQdWi40bPTY9FhaQmfDht8eGCM-mSCCGCdwYy0GyLPqvjxEJCpFTXhA03iLQxj8XUEzfW8gHb-2GGXfhiQdZTDCvljq-A1r0Qff81KFZHHSYbvff%2Bl9IH0QLYQbdkYGD3gFxBBAjz-2wVj3jyWyThhkv1mUr3X2BhgFxEkgwGMhH2w1fASGmHw3YEI2nxICXwzBQAXwkEIIZnjjg1wV3w8SuTTVN1-jxgHUeWJjeTnX1mxA5GJWlAgTz0ply151ejRTTywxfFw2wMnyI3-CIFI1MAo2o2wFowAPRyGUG2v3mWsUQOQIwFQMLBa0hAbzTXayxF6zj0YIdyHUx1P3TxBQwB4JKUpmGycGUIl0x021fjLycHBwOH2yx1BFZhxxUDX1vydi0J0Nog7EgKaUb3GiVWoPPQ0UvTklZWiOLjUOXw0KdhkCQFAJSIANML9gT2WysMkRAEcN7yvRAB3DwEcO4FYFYCYCbAADFahVB-cmIMtBw4Cb8Fk3pnZsid8wCFZo8wC%2BtIjBsJFUVlVB0xsgc3DQwdsjN4lfD-C5tCQqiUBHCLNmi0A6NRFtjCBxcoC-o5jts88vDGAfDZU-DOi0iEDMj%2Bj6JqCbx7VRizCjid4JiKkpjmCg409gUTiPC08yssd%2BCBCoR1jNjVMwBsBJJykNsgwttATzjFcljZVQTADVodwcjDCo8esRj8iBdE8rCFtCik4hdnD3iDsrcAigiejgZMIkCUC0CRCx8sDPxcCp8-wCDLF59JgyCV89DDInj-FPVXiCjKSk9Si0VpjfigcQdCwgTVMecC8VDXCET3CFjudKY0SOibjoFaSMi3A-hQjmTR9MD-Z2TvxJDuS59iC%2BTuiTAKCVd9DhTOMTD5s3jWDYiqE1o-j506QBZFS9tlT6NC9fpBSAS2pZM8pPMa4rRXIrCeV%2BDkTIdtT2i9sTMSFbjgijTGTtDjIJVQR0DRDx9xCOTrTCDeTF8HSKCxjMdciHC0UX8KSoicTxoFIgA'
                }
                useSameWindow={true}
            >
                {'Shape Checking - EllipsisType'}
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
                onSubmitForm={handleFormSubmit}
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

const handleFormSubmit = () => {
    // Display a thank you message and reload form
    alert('Thank you for your feedback! Follow along and join the discussion here: https://discuss.python.org/c/typing/32');
    window.location.reload();
};

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
