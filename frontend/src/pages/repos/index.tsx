import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import RepoCard from '@/components/RepoCard';
import connectContract from '@/utils/web3Utils/connectContract';

interface Repository {
  repoID: number;
  name: string;
  desc: string;
  owners: string[];
  cid: string[];
  repoTime: number;
  pullTime: number;
  encrypted: boolean;
  pull: any[];
}

const Page = () => {

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const func = async() =>{
      const { contract, accounts } = await connectContract();
      const res: Repository[] = await contract.methods.getAllRepo().call({ from: accounts[0] });
      console.log(res);
      console.log(Number(res[0].repoID));
      setRepositories(res);
    }
    func()
  },[]);



  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", padding: "100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
        <span style={{ fontSize: "25px", fontWeight: "600" }}>All Repositories</span>
      </div>
      <div style={{ width: "80%", marginTop: "30px" }}>
        {repositories.length > 0 ? (
          repositories.map((repo) => (
            <RepoCard
              id={Number(repo.repoID)}
              title={repo.name}
              description={repo.desc}
              creatorAddress={repo.owners[0]}
              link={`/Repo/${Number(repo.repoID)}`}
            />
          ))
        ) : (
          <div>No repositories found.</div>
        )}
      </div>
    </div>
  );
};

export default Page;