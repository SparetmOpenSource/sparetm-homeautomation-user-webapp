import { useEffect, useState, useMemo, useCallback } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import ColorPicker from '../../ColorPicker/ColorPicker';
import { IoCheckmarkDoneSharp, IoCloudDoneOutline } from 'react-icons/io5';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import './DeviceCard.css';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import {
    ConvertTheRange,
    ConvertTheRangeToRound,
    displayToastify,
    invalidateQueries,
} from '../../../../Utils/HelperFn';
import { usePatchUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../Api.tsx/CoreAppApis';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';
import { useAppSelector } from '../../../../Features/ReduxHooks';
import {
    LandscapeSizeM,
    RGB_GADGET_EXPAND_INFO
} from '../../../../Data/Constants';
import { SELECT_DEVICE_LIST_QUERY_ID } from '../../../../Data/QueryConstant';
import { useQueryClient } from 'react-query';
import nanoleaf from '../../../../Assets/nanoleaf.svg';
import { ReactSVG } from 'react-svg';
import { useBackDropOpen } from '../../../../Pages/ThemeProvider';
import { updateHeaderConfig } from '../../../../Api.tsx/Axios';
import ApplianceExpand from './ApplianceExpand';
import RgbGadgetExpandSavedColor from './RgbGadgetExpandSavedColor';
import { IoMdCloudDownload } from 'react-icons/io';
import { GadgetRgbRainbowPattern } from '../../../../Data/DeviceRoomConstant';
import { SiNano } from 'react-icons/si';
import { useDeviceMutation } from '../../../../Hooks/useDeviceMutation';

interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

interface RgbGadgetExpandProps {
    id: string;
    defaultBrightness: number;
    background: number[];
    darkTheme: boolean;
    rgbGadgetExpandBackdropId: string;
    currentDeviceStatus: boolean;
    currentAnimation: string;
    onNavigate: (path: string) => void;
}

const RgbGadgetExpand = ({
    id,
    defaultBrightness,
    background,
    darkTheme,
    rgbGadgetExpandBackdropId,
    currentDeviceStatus,
    currentAnimation,
    onNavigate,
}: RgbGadgetExpandProps) => {
    const currentDevice = useAppSelector(
        (state: any) =>
            state?.device?.deviceData?.body?.find(
                (device: any) => device.deviceId === id,
            ) ?? null,
    );

    const [color, setColor] = useState(light_colors);
    const [saveColorMenu, setSaveColorMenu] = useState(false);
    const [rgb, setRgb] = useState<RGBA>({
        r: background[0],
        g: background[1],
        b: background[2],
        a: ConvertTheRange(defaultBrightness, 0, 100, 0, 1),
    });
    const [animation, setAnimation] = useState<string>(currentAnimation);

    const queryClient = useQueryClient();
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();

    const brightnessPercent = useMemo(
        () => ConvertTheRangeToRound(rgb.a, 0, 1, 0, 100),
        [rgb.a],
    );

    useEffect(() => {
        setColor(darkTheme ? dark_colors : light_colors);
    }, [darkTheme]);

    const { mutate } = useDeviceMutation(
        `${featureUrl.update_device}${id}`,
        updateHeaderConfig,
        () => {
            invalidateQueries(queryClient, [SELECT_DEVICE_LIST_QUERY_ID]);
            toggleBackDropClose(rgbGadgetExpandBackdropId);
        },
    );

    const { mutate: updateDeviceStoreData } = usePatchUpdateData(
        `${featureUrl.update_device_data_store}${id}`,
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

    const handleMenuChange = useCallback((saveMode: boolean) => {
        setSaveColorMenu(saveMode);
    }, []);

    const handleColorChange = useCallback(() => {
        mutate({
            status: true,
            statusDetail: `${rgb.r},${rgb.g},${rgb.b},${rgb.a},${animation}`,
        });
        if (animation === GadgetRgbRainbowPattern) {
            displayToastify(
                `Colors cannot be applied while the ${GadgetRgbRainbowPattern} animation is active`,
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.WARN,
            );
        }
    }, [rgb, animation, mutate, darkTheme]);

    const handleColorSave = useCallback(() => {
        updateDeviceStoreData({
            deviceDataStore: `${rgb.r},${rgb.g},${rgb.b}`,
        } as any);
    }, [rgb, updateDeviceStoreData]);

    return (
        <div
            className="rgbGadgetExpand"
            style={{ backgroundColor: color.element }}
        >
            <section>
                <ColorPicker rgb={rgb} setRgb={setRgb} darkTheme={darkTheme} />
            </section>

            <section>
                <span
                    style={{ color: color.text, backgroundColor: color.outer }}
                >
                    <section>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 1.0 }}
                            onClick={() => handleMenuChange(false)}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: !saveColorMenu
                                        ? color.button
                                        : color.icon,
                                }}
                            >
                                <SiNano />
                            </IconContext.Provider>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 1.0 }}
                            onClick={() => handleMenuChange(true)}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2.5em',
                                    color: saveColorMenu
                                        ? color.button
                                        : color.icon,
                                }}
                            >
                                <IoMdCloudDownload />
                            </IconContext.Provider>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 1.0 }}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                const backdropId = `${RGB_GADGET_EXPAND_INFO}_${id}`;
                                toggleBackDropOpen(
                                    backdropId,
                                    <ApplianceExpand
                                        id={id}
                                        darkTheme={darkTheme}
                                        applianceExpandBackdropId={backdropId}
                                        rgbGadgetExpandBackdropId={
                                            rgbGadgetExpandBackdropId
                                        }
                                        currentDeviceStatus={
                                            currentDeviceStatus
                                        }
                                    />,
                                    LandscapeSizeM,
                                );
                            }}
                        >
                            <IconContext.Provider
                                value={{ size: '2em', color: color.button }}
                            >
                                <HiOutlineInformationCircle />
                            </IconContext.Provider>
                        </motion.div>
                    </section>
                </span>

                <span
                    style={{ color: color.text, backgroundColor: color.inner }}
                >
                    {!saveColorMenu ? (
                        <>
                            <ReactSVG
                                src={nanoleaf}
                                beforeInjection={(svg) => {
                                    svg.querySelectorAll('.primary').forEach(
                                        (el) =>
                                            el.setAttribute(
                                                'style',
                                                `fill: rgb(${rgb.r},${rgb.g},${rgb.b}); stroke: ${color.element};`,
                                            ),
                                    );
                                    svg.querySelectorAll('.secondary').forEach(
                                        (el) =>
                                            el.setAttribute(
                                                'style',
                                                `fill: rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a}); stroke: ${color.element};`,
                                            ),
                                    );
                                }}
                            />
                            <p
                                className="rgbGadgetExpand-pattern-type"
                                style={{
                                    color: color.text,
                                    backgroundColor: color.element,
                                }}
                            >
                                {animation}
                            </p>
                        </>
                    ) : (
                        <RgbGadgetExpandSavedColor
                            id={id}
                            deviceDataStoreArray={
                                currentDevice?.deviceDataStore
                            }
                            currentRgbColor={`${rgb.r},${rgb.g},${rgb.b}`}
                            setRgb={setRgb}
                            brightness={brightnessPercent}
                            setAnimation={setAnimation}
                            currentAnimation={animation}
                            darkTheme={darkTheme}
                        />
                    )}
                </span>

                <span style={{ backgroundColor: color.outer }}>
                    <div
                        className="rgbGadgetExpand-r"
                        style={{ color: color.text }}
                    >
                        {rgb.r}
                    </div>
                    <div
                        className="rgbGadgetExpand-g"
                        style={{ color: color.text }}
                    >
                        {rgb.g}
                    </div>
                    <div
                        className="rgbGadgetExpand-b"
                        style={{ color: color.text }}
                    >
                        {rgb.b}
                    </div>
                    <div
                        className="rgbGadgetExpand-brightness"
                        style={{
                            backgroundColor: color.inner,
                            color: color.text,
                        }}
                    >
                        {brightnessPercent}%
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 1.0 }}
                        style={{ cursor: 'pointer' }}
                        onClick={handleColorSave}
                    >
                        <IconContext.Provider
                            value={{ size: '2.5em', color: color.icon }}
                        >
                            <IoCloudDoneOutline />
                        </IconContext.Provider>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 1.0 }}
                        style={{ cursor: 'pointer' }}
                        onClick={handleColorChange}
                    >
                        <IconContext.Provider
                            value={{ size: '2em', color: color.icon }}
                        >
                            <IoCheckmarkDoneSharp />
                        </IconContext.Provider>
                    </motion.div>
                </span>
            </section>
        </div>
    );
};

export default RgbGadgetExpand;
