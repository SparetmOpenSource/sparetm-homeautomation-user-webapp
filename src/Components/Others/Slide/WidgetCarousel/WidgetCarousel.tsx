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
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const listRef = useRef<HTMLUListElement>(null);
    const itemRef = useRef<HTMLLIElement>(null);

    const checkScroll = useCallback(() => {
        if (listRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
            const tolerance = 20;
            setCanScrollLeft(scrollLeft > tolerance);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
        }
    }, []);

    useEffect(() => {
        // Initial check and on resize
        checkScroll();
        window.addEventListener('resize', checkScroll);
        // Also check periodically during interactions if needed, but onScroll should cover it
        return () => window.removeEventListener('resize', checkScroll);
    }, [checkScroll, items]);

    const handleClick = useCallback((direction: 'previous' | 'next') => {
        if (listRef.current && itemRef.current) {
            const itemWidth = itemRef.current.offsetWidth;
            const scrollAmount =
                direction === 'previous' ? -itemWidth * 2 : itemWidth * 2;
            listRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
            // Manual check after animation finishes (smooth scroll can take ~500ms)
            setTimeout(checkScroll, 600); 
        }
    }, [checkScroll]);

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
                    onScroll={checkScroll}
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
                    whileHover={{ scale: canScrollLeft ? 1.1 : 1 }}
                    whileTap={{ scale: canScrollLeft ? 0.9 : 1 }}
                    onClick={() => canScrollLeft && handleClick('previous')}
                    style={{ opacity: canScrollLeft ? 1 : 0.3, cursor: canScrollLeft ? 'pointer' : 'default' }}
                >
                    <IconContext.Provider
                        value={{ size: '2.5em', color: color.button }}
                    >
                        <CiCircleChevLeft />
                    </IconContext.Provider>
                </motion.span>

                <motion.span
                    whileHover={{ scale: canScrollRight ? 1.1 : 1 }}
                    whileTap={{ scale: canScrollRight ? 0.9 : 1 }}
                    onClick={() => canScrollRight && handleClick('next')}
                    style={{ opacity: canScrollRight ? 1 : 0.3, cursor: canScrollRight ? 'pointer' : 'default' }}
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
