import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { OrgChart } from 'd3-org-chart';

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  let chart = null;

  function centeredView() {
    // chart.centeredView(node);
    chart.setCentered('1').render();
  }

  // const array = Object.groupBy(props.data, (d) => d.area);

  // console.log(array, 'RAY');
  props.setClick(centeredView);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 120)
        .expandAll()

        .nodeContent(function (d, i, arr, state) {
          const color = '#FFFFFF';
          return `
          <div style="padding-top:30px;background-color:none;margin-left:1px;height:${
            d.height
          }px;border-radius:2px;overflow:visible">
            <div style="height:${
              d.height - 32
            }px;padding-top:0px;background-color:white;border:1px solid lightgray;">
              <img src=" ${
                d.data.imageUrl
              }" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />
             <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${
               d.width - 2
             }px;border-radius:1px"></div>
             <div style="padding:20px; padding-top:35px;text-align:center">
                 <div style="color:#111672;font-size:16px;font-weight:bold"> ${
                   d.data.name
                 } </div>
                 <div style="color:#404040;font-size:16px;margin-top:4px"> ${
                   d.data.positionName
                 } </div>
             </div>
            </div>
    </div>
`;
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
