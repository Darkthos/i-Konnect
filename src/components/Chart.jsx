import React, { useEffect, useState } from 'react';

import getCharts from '../apis/charts/getChartApi';
import chartIcon from '../assets/imgs/ic_chart.svg';
import useMediaQuery from '../hooks/useMediaQuery';
import Button from './Button';
import ChartRank from './ChartRank';
import ChoiceGender from './ChoiceGender';

function Chart() {
  const matches = useMediaQuery('(min-width: 1280px)');
  const [chartList, setChartList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [chartOption, setChartOption] = useState({
    gender: 'female',
    cursor: '',
    pageSize: matches ? 10 : 5,
  });

  useEffect(() => {
    const loadChartList = async () => {
      const result = await getCharts(chartOption);
      setChartList(result.idols);
      setHasMore(result.nextCursor !== null);
    };
    loadChartList();
  }, [chartOption]);

  const handleClickMoreLook = () => {
    setChartOption((Options) => ({
      ...Options,
      pageSize: matches ? Options.pageSize + 10 : Options.pageSize + 5,
    }));
  };
  // setChartOption((Options) => ({...Options, 이거 중복많이되면 함수로 만들어보자

  const handleClickChangeGender = (gender) => {
    setChartOption((Options) => ({
      ...Options,
      gender,
    }));
  };

  return (
    <div className="flex-col">
      <div className="flex">
        <h3 className="1 grow text-base font-bold text-whitePrimary md:text-xl xl:text-2xl">
          이달의 차트
        </h3>
        <Button type="smallSquare">
          <div className="flex items-center justify-center gap-1">
            <img alt="chartIcon" src={chartIcon} />
            <p> 차트 투표하기</p>
          </div>
        </Button>
      </div>
      <div className="mt-4 flex md:mt-6">
        <ChoiceGender handleClickChangeGender={handleClickChangeGender} />
      </div>
      <div
        className={`mt-4 grid grid-cols-1 gap-x-6 md:mt-6 ${matches ? 'grid-cols-2' : ''}`}
      >
        {chartList?.map((chart, index) => {
          const isLastItem = index === chartList.length - 1;
          const isSecondLastItem = index === chartList.length - 2;

          let hideBorder = false;
          if (matches) {
            hideBorder = isLastItem || isSecondLastItem;
          } else {
            hideBorder = isLastItem;
          }

          return (
            <ChartRank
              src={chart.profilePicture}
              name={chart.name}
              group={chart.group}
              totalVotes={chart.totalVotes}
              key={crypto.randomUUID()}
              rank={index + 1}
              hideBorder={hideBorder}
            />
          );
        })}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center md:mt-7 xl:mt-12">
          <button
            type="button"
            className="border-#F1EEF9/80 w-80 rounded border bg-white/10 py-1 text-center text-sm font-bold leading-7"
            onClick={handleClickMoreLook}
          >
            더 보기
          </button>
        </div>
      )}
    </div>
  );
}

export default Chart;
