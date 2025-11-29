import { useState, useCallback, useMemo } from 'react';
import './DeviceCard.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaHubspot } from 'react-icons/fa';
import {
    LandscapeSizeS,
    RGB_GADGET_DELETE_DEVICE_SAVED_DATA,
} from '../../../../Data/Constants';
import Confirmation from '../../BackDrop/Confirmation/Confirmation';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';
import {
    ConvertTheRange,
    displayToastify,
    invalidateQueries,
} from '../../../../Utils/HelperFn';
import { useBackDropOpen } from '../../../../Pages/ThemeProvider';
import { BiCheck } from 'react-icons/bi';
import { TbIrregularPolyhedron } from 'react-icons/tb';
import { GiOilySpiral } from 'react-icons/gi';
import { LuRainbow } from 'react-icons/lu';
import { usePatchUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../Api.tsx/CoreAppApis';
import { updateHeaderConfig } from '../../../../Api.tsx/Axios';
import { SELECT_DEVICE_LIST_QUERY_ID } from '../../../../Data/QueryConstant';
import { useQueryClient } from 'react-query';

interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

interface RgbGadgetExpandSavedColorProps {
    id: string;
    deviceDataStoreArray: string[];
    currentRgbColor: string;
    setRgb: (rgb: RGBA) => void;
    brightness: number;
    setAnimation: (pattern: string) => void;
    currentAnimation: string;
    darkTheme: boolean;
}

const PATTERN_OPTIONS = [
    {
        id: 1,
        icon: <TbIrregularPolyhedron />,
        name: 'Linear',
        value: 'Linear',
    },
    { id: 2, icon: <GiOilySpiral />, name: 'Spiral', value: 'Spiral' },
    { id: 3, icon: <FaHubspot />, name: 'Pixel', value: 'Pixel' },
    { id: 4, icon: <LuRainbow />, name: 'Rainbow', value: 'Rainbow' },
];

const RgbGadgetExpandSavedColor = ({
    id,
    deviceDataStoreArray,
    currentRgbColor,
    setRgb,
    brightness,
    setAnimation,
    currentAnimation,
    darkTheme,
}: RgbGadgetExpandSavedColorProps) => {
    const [savedColorActive, setSavedColorActive] = useState<string>();
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const queryClient = useQueryClient();

    const themeColors = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

    const { mutate: removeDeviceStoreData } = usePatchUpdateData(
        `${featureUrl?.remove_device_data_store}${id}`,
        updateHeaderConfig,
        () => {
            invalidateQueries(queryClient, [SELECT_DEVICE_LIST_QUERY_ID]);
        },
        (error: any) => {
            displayToastify(
                error?.message,
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        },
    );

    const removeSelectedSavedColor = useCallback(
        (colorToRemove?: string) => {
            const color =
                colorToRemove ||
                deviceDataStoreArray.find(
                    (item: string) => item === currentRgbColor,
                );

            if (color) {
                removeDeviceStoreData({
                    deviceDataStore: `${color}`,
                } as any);
                setSavedColorActive(undefined);
            } else {
                displayToastify(
                    `Pick a color first to remove it`,
                    !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                    TOASTIFYSTATE.WARN,
                );
            }
        },
        [
            darkTheme,
            removeDeviceStoreData,
            currentRgbColor,
            deviceDataStoreArray,
        ],
    );

    const changeToSavedColor = useCallback(
        (color: string) => {
            const [r, g, b] = color?.split(',')?.map((n) => parseInt(n, 10));
            setRgb({
                r,
                g,
                b,
                a: ConvertTheRange(brightness, 0, 100, 0, 1),
            });
            setSavedColorActive(color);
        },
        [brightness, setRgb],
    );

    const changeToSavedPattern = useCallback(
        (pattern: string) => {
            setAnimation(pattern);
        },
        [setAnimation],
    );

    return (
        <div className="rgbGadgetExpandSavedColor">
            <section style={{ backgroundColor: themeColors.inner }}>
                <div className="rgbGadgetExpandSavedColor_withData">
                    {PATTERN_OPTIONS?.length > 0 &&
                        PATTERN_OPTIONS?.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background:
                                        item.value === currentAnimation
                                            ? themeColors.text
                                            : themeColors.outer,
                                }}
                                className="rgbGadgetExpandSavedColor_withData_pattern"
                                onClick={() =>
                                    changeToSavedPattern(item?.value)
                                }
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '2em',
                                        color:
                                            item.value === currentAnimation
                                                ? themeColors.button
                                                : 'gray',
                                    }}
                                >
                                    {item.icon}
                                </IconContext.Provider>
                            </motion.div>
                        ))}

                    {deviceDataStoreArray?.length > 0 &&
                        deviceDataStoreArray?.map((item: any, index: any) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ background: `rgb(${item})` }}
                                className="rgbGadgetExpandSavedColor_withData_color"
                                onClick={() => changeToSavedColor(item)}
                            >
                                {item === currentRgbColor && (
                                    <IconContext.Provider
                                        value={{
                                            size: '2em',
                                            color: 'white',
                                        }}
                                    >
                                        <BiCheck />
                                    </IconContext.Provider>
                                )}
                            </motion.div>
                        ))}
                </div>
            </section>

            <section style={{ backgroundColor: themeColors.outer }}>
                <span>
                    <p style={{ color: themeColors.icon }}>
                        selected animation:{' '}
                        <span style={{ color: themeColors.button }}>
                            {currentAnimation}
                        </span>
                    </p>
                </span>

                <motion.span
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 0.75 }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        const backdropId = `${RGB_GADGET_DELETE_DEVICE_SAVED_DATA}_${id}`;
                        toggleBackDropOpen(
                            backdropId,
                            <Confirmation
                                darkTheme={darkTheme}
                                heading="You want to delete this color, Are you sure?"
                                btnOkFn={() => {
                                    toggleBackDropClose(backdropId);
                                    removeSelectedSavedColor(savedColorActive);
                                }}
                                btnCancelFn={() =>
                                    toggleBackDropClose(backdropId)
                                }
                                btnOkLabel="Yes"
                                btnCancelLabel="Cancel"
                            />,
                            LandscapeSizeS,
                        );
                    }}
                >
                    <IconContext.Provider
                        value={{ size: '2em', color: themeColors.text }}
                    >
                        <AiTwotoneDelete />
                    </IconContext.Provider>
                </motion.span>
            </section>
        </div>
    );
};

export default RgbGadgetExpandSavedColor;
