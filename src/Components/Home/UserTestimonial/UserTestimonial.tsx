import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SubUserTestimonialShadow from './SubUserTestimonialShadow/SubUserTestimonialShadow';
import SubUserTestimonialBox from './SubUserTestimonialBox/SubUserTestimonialBox';
import SubUserTestimonialBoxAfter from './SubUserTestimonialBoxAfter/SubUserTestimonialBoxAfter';
import { page_3_userReview_list as Items } from './../../../Data/HomePageConstant';
import './UserTestimonial.css';

const UserTestimonial = () => {
    const [selectedId, setSelectedId] = useState<any>(null);

    return (
        <div className="userTestimonial">
            <ul className="userTestimonial_list">
                {selectedId !== null &&
                    Items.map((item) => (
                        <SubUserTestimonialShadow
                            key={item.id}
                            id={item.id}
                            selectedId={selectedId}
                        />
                    ))}

                {selectedId == null &&
                    Items.map((item) => (
                        <SubUserTestimonialBox
                            id={item.id}
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            setSelectedId={setSelectedId}
                        />
                    ))}
            </ul>
            <AnimatePresence>
                {selectedId && (
                    <SubUserTestimonialBoxAfter
                        selectedId={selectedId}
                        key={selectedId}
                        setSelectedId={setSelectedId}
                        items={Items}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserTestimonial;
