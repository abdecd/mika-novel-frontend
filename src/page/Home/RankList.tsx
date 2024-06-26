import {memo, useState} from "react";
import {Skeleton, TabList} from "@natsume_shiki/mika-ui";
import './RankList.less';
import {NovelInfo} from "../../common/novel";
import {useNavigate} from "react-router-dom";

type RankListProps = {
    items: NovelInfo[][];
    rankTitle: string[];
}

const Loading = memo(() => {
    return (
        <div className="mika-novel-rank-list-loading-container">
            <Skeleton type='text' height='20px'/>
            <Skeleton type='text' height='20px'/>
            <Skeleton type='text' height='20px'/>
            <Skeleton type='text' height='20px'/>
            <Skeleton type='text' height='20px'/>
            <Skeleton type='text' height='20px'/>
            <Skeleton type='text' height='20px'/>
            <Skeleton type='text' height='20px'/>
            <Skeleton type='text' height='20px'/>
        </div>
    );
});

const RankList = memo((props: RankListProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const isActiveEmpty = !props.items || !props.items[activeIndex] || props.items[activeIndex].length === 0;
    const nav = useNavigate();

    return (
        <div className="mika-novel-rank-list">
            <TabList style={{fontSize: '18px', margin: '15px 0'}} items={props.rankTitle} activeIndex={activeIndex}
                     onChange={setActiveIndex}/>
            <div className="mika-novel-rank-list-content">
                {!isActiveEmpty && props.items[activeIndex].map((item, index) => (
                    <div key={item.id} className="mika-novel-rank-list-item" onClick={() => {
                        nav(`/novel/${item.id}`);
                    }}>
                        <span>{index + 1}</span>
                        <a>{item.title}</a>
                    </div>
                ))}
                {isActiveEmpty && <Loading/>}
            </div>
        </div>
    );
});

export default RankList;
