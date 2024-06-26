import {Button, Image, showMessage} from "@natsume_shiki/mika-ui";
import "./NovelPageDetail.less";
import {memo, useEffect, useState} from "react";
import {addFavorite, getIsFavorite, NovelInfo, removeFavorite} from "../../common/novel";
import {useNavigate} from "react-router-dom";
import {useStore} from "mika-store";
import {baseURL} from "../../common/axios";

const AuthorIcon = memo(() => {
    return (<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M737.8 841.9l63.9-31.4c7.7 28.5 11.8 58.5 11.8 89.4v6.4h-69.3c0-1.7 0.1-3.5 0.1-5.2-0.1-19.8-2.2-39.7-6.5-59.2z m-120.7-171c-41.4-25.8-89.2-39.4-137.9-39.3-146.3 0-265 120.7-265 269.7 0 1.7 0 3.5 0.1 5.2H145l-0.1-5.2v-1.2h-0.1c0-158.2 106.8-291.1 250.7-329-89.5-36.1-148.1-123-147.8-219.5 0-129.9 103.8-235.6 231.5-235.6 127.6 0 231.5 105.7 231.5 235.6 0 99.9-61.5 185.2-148 219.4 31.4 8.3 61.4 21.2 89 38.2l-34.6 61.7zM318 351.6c0 90.4 72.3 164 161.2 164 88.9 0 161.1-73.6 161.1-164 0-90.5-72.3-164-161.1-164-88.9-0.1-161.2 73.5-161.2 164z m561.4 136.8c-2.4 16.5-5.1 34.1-8.6 53.1s-7.3 37.9-11.4 57.3c-3.8 17.8-7.9 35.5-12.4 53.1l-57 31.6c6.9-2.1 13.8-3.9 20.4-6 5.5-1.7 11.4-3.5 17.3-5.2 5.8-1.8 11-3.2 14.9-4.9l-5.9 22.8c-1.7 6.3-3.1 11.3-4.8 14.4-2.8 7.8-6.2 15.1-10.1 21.4-3.8 6.7-7.6 12.3-10.7 17.2-3.8 5.6-8 11.3-12.4 15.8l-52.2 15.8 42.8 7.7c-5.6 4.9-11.8 9.8-18.3 15.1-5.5 4.3-12.1 8.8-19.3 13.7-7.3 4.9-14.9 9.2-22.8 13-8.3 3.9-17.4 6.1-26.6 6.3-9.7 0-19-0.3-27.7-2.1-10.4-1.5-20.6-3.9-30.4-7.4 3.1-4.9 6.6-10.2 10.1-16.5 3.1-5.3 6.9-11.3 11.4-18.3s9-14.8 13.8-23.5c13.5-23.2 26.6-46 39.4-68.5 12.8-22.5 24.2-42.9 34.5-60.8 11.8-21.1 22.8-40.8 33.5-59.8-13.5 15.5-27.3 33-42.2 52.4-14.7 19.1-28.8 38.5-42.5 58.3-16.6 24.3-32.5 49-47.7 74.2-3.5 5.6-7.3 11.9-11.4 19-4.1 7-8.6 14.8-13.5 22.8-4.8 8.1-9.3 16.2-14.5 24.9-4.8 8.4-9.7 16.9-14.5 24.9-11.4 18.6-22.8 38.3-34.9 58.7 0.3-6 1.4-13.7 3.4-23.2 1.7-8.1 4.5-18.3 8.7-30.2 3.8-12 9.7-26.4 16.9-42.9 4.8-10.2 8.6-18.3 11.1-24.3 2.4-6 4.5-10.2 5.8-13.3 0.9-2.5 2-4.8 3.5-7-1.4-1.7-1.7-5.3-0.7-10.2 0.7-4.6 2.1-11.3 4.8-20 2.7-8.8 7.3-21.1 13.8-36.9 6.6-16.2 15.2-33.4 25.6-52 10.7-18.6 22.5-36.9 36-55.2 13.5-18.4 27.9-36.1 43.2-53 14.7-16.4 30.7-31.7 47.7-45.7 16.2-13.4 32.5-24.3 48.7-32.7 16.2-8.4 32.1-13.4 47.3-14.4 1 10.6-0.1 23.6-2.1 40.5z m0 0"></path>
    </svg>);
});

const NovelPageDetail = (novelData: NovelInfo) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const nav = useNavigate();
    const [lastRead, _setLastRead] = useStore<{
        volumeId: number,
        chapterId: number
    } | null>("mika-novel-last-read", null);

    useEffect(() => {
        setIsFavorite(false);

        getIsFavorite(Number(novelData.id)).then((res) => {
            setIsFavorite(res);
        });
    }, [novelData.id]);

    return (
        <div className="mika-novel-page-novel-detail">
            <Image src={baseURL + novelData?.cover} alt={novelData?.title} className="mika-novel-page-novel-cover"
                   width={150}
                   height={230}/>
            <h1>{novelData?.title}</h1>
            <div className="mika-novel-page-novel-author">
                <AuthorIcon/>
                {novelData?.author}
            </div>
            <div className="mika-novel-page-novel-tags">
                {novelData?.tags.map((tag, _index) => {
                    return <span key={tag.id} onClick={() => {
                        nav(`/search/${tag.tagName}/1`);
                    }}>{tag.tagName}</span>
                })}
            </div>
            <p>{novelData?.description}</p>
            <div className="mika-novel-page-novel-action">
                <Button styleType="primary" size="large" onClick={() => {
                    if (lastRead) {
                        nav(`/novel/${novelData.id}/${lastRead.volumeId}/${lastRead.chapterId}`);
                    } else nav(`/novel/${novelData.id}/0/0`);
                }}>
                    {lastRead ? '继续阅读' : '开始阅读'}
                </Button>
                {!isFavorite && <Button styleType="default" size="large" onClick={async () => {
                    return addFavorite(novelData.id).then(res => {
                        if (res.code === 200) {
                            setIsFavorite(true);
                            showMessage({children: "收藏成功", duration: "0.3s", remainingTime: 1000});
                        }
                        res.code === 401 && nav("/login");
                    });
                }}>加入收藏</Button>}
                {isFavorite && <Button styleType="default" size="large" onClick={async () => {
                    return removeFavorite(novelData.id).then(res => {
                        if (res.code === 200) {
                            setIsFavorite(false);
                            showMessage({children: "移除成功", duration: "0.3s", remainingTime: 1000});
                        }
                        res.code === 401 && nav("/login");
                    });
                }}>
                    移除收藏
                </Button>}
            </div>
        </div>
    );
}


export default NovelPageDetail;
