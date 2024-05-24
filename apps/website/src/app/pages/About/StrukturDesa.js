import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { OrgChartComponent } from '../../components/OrganizationChart';

export default function StrukturDesa() {
  const [data, setData] = useState(null);
  let addNodeChildFunc = null;

  function centeredView() {
    const node = {
      nodeId: 'new Node',
      parentNodeId: 'O-6066',
    };

    addNodeChildFunc(node);
  }

  function onNodeClick(nodeId) {
    // console.log('d3', d3.event);
    alert('clicked ' + nodeId);
  }

  useEffect(() => {
    d3.csv('../../../assets/csv/org.csv').then((data) => {
      setData(data);
    });
  }, [true]);
  return (
    <div>
      <div className="w-full flex justify-center">
        <button
          onClick={() => centeredView()}
          className="bg-zinc-900 text-white text-xs rounded-md justify-center py-2 px-4 mt-4 mb-4 hover:bg-zinc-700"
        >
          Klik untuk mereset tampilan
        </button>
      </div>
      <OrgChartComponent
        setClick={(click) => (addNodeChildFunc = click)}
        onNodeClick={onNodeClick}
        data={data}
      />
    </div>
  );
}
