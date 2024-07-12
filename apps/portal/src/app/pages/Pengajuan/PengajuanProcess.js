import React, { useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function PengajuanProcess() {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {loading ? <LoadingSpinner /> : <h1>process pengajuan</h1>}
        </div>
      </div>
    </div>
  );
}
