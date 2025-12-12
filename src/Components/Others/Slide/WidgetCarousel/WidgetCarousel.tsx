// refactor code -----------------------------
import './WidgetCarousel.css';
import { motion, Reorder } from 'framer-motion';
import { CiCircleChevLeft, CiCircleChevRight, CiLock, CiUnlock } from 'react-icons/ci';
import { IconContext } from 'react-icons';

import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useTheme } from '../../../../Pages/ThemeProvider';
import { useAppSelector } from '../../../../Features/ReduxHooks';

import { getWidgets, WidgetItem } from './WidgetConfig';

const getThemeColors = (isDark: boolean) =>
    isDark ? dark_colors : light_colors;

const WidgetCarousel = () => {
    const isDarkTheme = useTheme();
    const color = useMemo(() => getThemeColors(isDarkTheme), [isDarkTheme]);
    const profile = useAppSelector((state: any) => state?.user?.profile);

    const [refreshKey, setRefreshKey] = useState(false);
    const [items, setItems] = useState<WidgetItem[]>([]);
    const [isDragMapLocked, setIsDragMapLocked] = useState(true);

    const listRef = useRef<HTMLUListElement>(null);
    const itemRef = useRef<HTMLLIElement>(null);

    const handleClick = useCallback((direction: 'previous' | 'next') => {
        if (listRef.current && itemRef.current) {
            const itemWidth = itemRef.current.offsetWidth;
            const scrollAmount =
                direction === 'previous' ? -itemWidth * 2 : itemWidth * 2;
            listRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    }, []);

    const handleRefresh = useCallback(() => {
        setRefreshKey((prev) => !prev);
    }, []);

    const defaultWidgets: WidgetItem[] = useMemo(
        () => getWidgets(refreshKey, handleRefresh),
        [refreshKey, handleRefresh]
    );

    // Initialize/Load Order
    useEffect(() => {
        if (!profile) return;

        const storageKey = `WIDGET_ORDER_${profile}`;
        const storedOrder = localStorage.getItem(storageKey);

        if (storedOrder) {
            try {
                const orderedIds: number[] = JSON.parse(storedOrder);
                const reorderedWidgets = orderedIds
                    .map((id) => defaultWidgets.find((w) => w.id === id))
                    .filter((w): w is WidgetItem => w !== undefined);

                // Add any new widgets that weren't in storage
                const newWidgets = defaultWidgets.filter(
                    (w) => !orderedIds.includes(w.id)
                );
                
                setItems([...reorderedWidgets, ...newWidgets]);
            } catch (e) {
                console.error('Failed to parse widget order', e);
                setItems(defaultWidgets);
            }
        } else {
            setItems(defaultWidgets);
        }
    }, [profile, defaultWidgets]);

    const handleReorder = (newOrder: WidgetItem[]) => {
        setItems(newOrder);
        if (profile) {
            const orderIds = newOrder.map((w) => w.id);
            localStorage.setItem(`WIDGET_ORDER_${profile}`, JSON.stringify(orderIds));
        }
    };

    return (
        <div className="widgetCarousel">
            <div>
                <Reorder.Group 
                    axis="x" 
                    values={items} 
                    onReorder={handleReorder} 
                    className="widgetCarousel-list" 
                    ref={listRef}
                >
                    {items.map((widget, index) => (
                        <Reorder.Item
                            key={widget.id}
                            value={widget}
                            className="widgetCarousel-list-item"
                            ref={index === 0 ? (itemRef as any) : null}
                            whileDrag={{ scale: 1.05 }}
                            drag={!isDragMapLocked}
                        >
                            {widget.component}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
            <div>
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleClick('previous')}
                >
                    <IconContext.Provider
                        value={{ size: '2.5em', color: color.button }}
                    >
                        <CiCircleChevLeft />
                    </IconContext.Provider>
                </motion.span>

                <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleClick('next')}
                >
                    <IconContext.Provider
                        value={{ size: '2.5em', color: color.button }}
                    >
                        <CiCircleChevRight />
                    </IconContext.Provider>
                </motion.span>
                
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsDragMapLocked(!isDragMapLocked)}
                >
                    <IconContext.Provider
                        value={{ size: '2.5em', color: color.button }}
                    >
                        {isDragMapLocked ? <CiLock /> : <CiUnlock />}
                    </IconContext.Provider>
                </motion.span>
            </div>
        </div>
    );
};

export default WidgetCarousel;
