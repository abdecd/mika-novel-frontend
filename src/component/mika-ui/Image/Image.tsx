import React, {useCallback, useEffect} from "react";
import "./Image.css";

interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
    src: string;

    width: number;
    height: number;
    alt?: string;

    // 当图片加载时显示的内容
    loading?: React.ReactNode;
    // 当图片加载失败时显示的内容
    error?: React.ReactNode;

    onLoaded?: () => unknown;
    onError?: () => unknown;

    // 自定义加载图片的方法
    loader?: () => Promise<string>;
}

const DefaultLoading = ({width, height}: { width: number; height: number; }) => {
    return (
        <div className='mika-image-loading' style={{
            minWidth: width + "px",
            minHeight: height + "px",
        }}>
            <svg viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M842.688 128 181.312 128C116.64 128 64 180.64 64 245.312l0 533.376C64 843.36 116.64 896 181.312 896l661.376 0C907.36 896 960 843.36 960 778.688L960 245.312C960 180.64 907.36 128 842.688 128zM288 288c35.36 0 64 28.64 64 64s-28.64 64-64 64c-35.328 0-64-28.64-64-64S252.672 288 288 288zM832 736c0 17.696-14.304 31.488-32 31.488L225.92 768c-0.128 0-0.224 0-0.352 0-10.08 0-19.616-4.288-25.664-12.384-6.112-8.192-7.936-18.56-4.896-28.352 2.304-7.488 58.272-183.552 180.064-183.552 38.08 0.896 67.424 9.824 95.776 18.336 35.712 10.72 70.528 19.936 109.664 13.76 20.448-3.296 28.896-23.808 43.328-69.952 19.04-60.8 47.808-152.736 174.656-152.736 17.536 0 31.776 14.08 32 31.616L832 511.616 832 736z"
                    fill="#ffffff"></path>
            </svg>
        </div>
    );
};


const DefaultError = ({width, height}: { width: number; height: number; }) => {
    return (
        <div className='mika-image-error' style={{
            minWidth: width + "px",
            minHeight: height + "px",
        }}>
            <svg viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M842.688 128 181.312 128C116.64 128 64 180.64 64 245.312l0 533.376C64 843.36 116.64 896 181.312 896l661.376 0C907.36 896 960 843.36 960 778.688L960 245.312C960 180.64 907.36 128 842.688 128zM288 288c35.36 0 64 28.64 64 64s-28.64 64-64 64c-35.328 0-64-28.64-64-64S252.672 288 288 288zM832 736c0 17.696-14.304 31.488-32 31.488L225.92 768c-0.128 0-0.224 0-0.352 0-10.08 0-19.616-4.288-25.664-12.384-6.112-8.192-7.936-18.56-4.896-28.352 2.304-7.488 58.272-183.552 180.064-183.552 38.08 0.896 67.424 9.824 95.776 18.336 35.712 10.72 70.528 19.936 109.664 13.76 20.448-3.296 28.896-23.808 43.328-69.952 19.04-60.8 47.808-152.736 174.656-152.736 17.536 0 31.776 14.08 32 31.616L832 511.616 832 736z"
                    fill="#ffffff"></path>
            </svg>
        </div>
    );
};

const useLoader = (_src: string, loader?: () => Promise<string>, onLoaded?: () => void, onError?: () => void) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [src, setSrc] = React.useState(_src);

    const onLoad = useCallback((src: string) => {
        setLoading(false);
        setError(false);
        setSrc(src);

        if (onLoaded) {
            onLoaded();
        }
    }, [onLoaded]);

    const onErr = useCallback(() => {
        setError(true);
        setLoading(false);

        if (onError) {
            onError();
        }
    }, [onError]);


    useEffect(() => {
        const _loader = loader || (async () => {
            return await fetch(_src).then((res) => {
                if (res.ok) {
                    return res.blob();
                }
                throw new Error("Image load error");
            }).then((blob) => {
                return URL.createObjectURL(blob);
            });
        });

        _loader().then((src) => {
            onLoad(src);
        }).catch(() => {
            onErr();
        });

    }, [_src, loader, onErr, onLoad]);


    return {loading, error, src};
}

const Image = React.forwardRef((props: ImageProps, ref: React.Ref<HTMLImageElement>) => {
    const {
        alt, src,
        loading,
        error,
        loader,
        onLoaded,
        onError, ...rest
    } = props;

    const {loading: _loading, error: _error, src: _src} = useLoader(src, loader, onLoaded, onError);

    if (_loading) {
        return (<>{props.loading || <DefaultLoading width={props.width} height={props.height}/>}</>);
    }

    if (_error) {
        return (<>{props.error || <DefaultError width={props.width} height={props.height}/>}</>);
    }
    return (
        <img src={_src} alt={alt} ref={ref} {...rest} />
    );
});

export default Image;