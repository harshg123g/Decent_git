import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import RepoCard from '@/components/RepoCard';
import connectContract from '@/utils/web3Utils/connectContract';


interface Pull {
  status: number;
  repoID: number;
  streamID: string;
}

const PullDashboard = () => {

  const [repositories, setRepositories] = useState<Pull[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const func = async() =>{
      const { contract, accounts } = await connectContract();
      const res: Pull[] = await contract.methods.getPullByRepo(3).call({ from: accounts[0] });
      console.log(res);
      setRepositories(res);
    }
    func()
  },[]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", padding: "100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
        <span style={{ fontSize: "25px", fontWeight: "600" }}>Repository PRS</span>
        <Button onClick={() => { location.href="pulls/create/"
}}>Create PR</Button>
      </div>
      <div style={{ width: "80%", marginTop: "30px" }}>
        {repositories.length > 0 ? (
          repositories.map((repo) => (
            <RepoCard
              title={repo.status}
              description={repo.repoID}
              creatorAddress={repo.streamID}
              link={`/Repo/${repo.streamID}`}
            />
          ))
        ) : (
          <div>No PRS found.</div>
        )}
      </div>
    </div>
  );
};

export default PullDashboard;












