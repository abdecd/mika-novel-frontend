import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import {Carousel} from "@natsume_shiki/mika-ui";
import NovelCard from "../../component/NovelCard/NovelCard";
import './Home.less';
import ReadingNovelList from "./ReadingNovelList";
import RecommendList from "./RecommendList";
import {getCarouselNovelList, getRankList, NovelInfo} from "../../common/novel/";
import {useEffect} from "react";
import RankList from "./RankList";
import SkeletonCard from "../../component/SkeletonCard/SkeletonCard.tsx";
import {useStore} from "mika-store";

const Home = () => {
    const [carouselList, setCarouselList] = useStore<NovelInfo[]>(`mika-novel-home-carousel-list`, []);
    const [dayRankList, setDayRankList] = useStore<NovelInfo[]>('mika-novel-home-day-rank-list', []);
    const [monthRankList, setMonthRankList] = useStore<NovelInfo[]>(`mika-novel-home-month-rank-list`, []);
    const [weekRankList, setWeekRankList] = useStore<NovelInfo[]>(`mika-novel-home-week-rank-list`, []);

    useEffect(() => {
        document.title = "首页";

        getCarouselNovelList().then(setCarouselList);
        getRankList("day", 1, 12).then((res) => {
            setDayRankList(res.records);
        });
        getRankList("month", 1, 12).then((res) => {
            setMonthRankList(res.records);
        });
        getRankList("week", 1, 12).then((res) => {
            setWeekRankList(res.records);
        });
    }, [setCarouselList, setDayRankList, setMonthRankList, setWeekRankList]);

    return (<div className="mika-novel-home-page-root">
            <Header/>
            <div className="mika-novel-home-page-wrapper">
                <Carousel items={
                    carouselList && carouselList.length > 0 ?
                        carouselList.map((item) => (
                            <NovelCard {...item} key={item.id}/>
                        )) : [1, 2, 3, 4, 5].map((item) => (<SkeletonCard key={item} padding='20px'/>))
                } className='mika-novel-carouse-list' autoSwitchByTime={3000}/>
                <ReadingNovelList/>
                <RecommendList/>
                <RankList items={[dayRankList, weekRankList, monthRankList]} rankTitle={["日榜", "周榜", "月榜"]}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
