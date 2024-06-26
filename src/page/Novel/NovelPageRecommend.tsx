import './NovelPageRecommend.less';
import {Image}  from "@natsume_shiki/mika-ui";
import {NovelInfo} from "../../common/novel";
import {useNavigate} from "react-router-dom";
import {baseURL} from "../../common/axios";

const NovelPageRecommend = ({novels}: { novels: NovelInfo[] }) => {
    const nav = useNavigate();

    if (novels.length === 0) {
        return (<div className="mika-novel-page-novel-recommend">
            <div className="mika-novel-page-novel-no-recommend">暂无相关推荐</div>
        </div>);
    }

    return (
        <div className="mika-novel-page-novel-recommend">
            <h2>相关推荐</h2>
            <div>
                {novels.map((novel, _index) => {
                    return (
                        <div key={novel.id} className="mika-novel-page-novel-recommend-item" onClick={() => {
                            nav(`/novel/${novel.id}`);
                        }}>
                            <Image src={baseURL + novel.cover} width={100} height={150}/>
                            <div>
                                <h3>{novel.title}</h3>
                                <p>{novel.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default NovelPageRecommend;
