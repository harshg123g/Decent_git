import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import RepoCard from '@/components/RepoCard';
import connectContract from '@/utils/web3Utils/connectContract';

interface Repository {
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
      const res: Repository[] = await contract.methods.getRepoByUser().call({ from: accounts[0] });
      console.log(res);
      setRepositories(res);
    }
    func()
  },[]);



  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", padding: "100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
        <span style={{ fontSize: "25px", fontWeight: "600" }}>Your Repositories</span>
        <Button onClick={() => { location.href = 'Repo/add'; }}>New Repository</Button>
      </div>
      <div style={{ width: "80%", marginTop: "30px" }}>
        {repositories.length > 0 ? (
          repositories.map((repo) => (
            <RepoCard
              title={repo.name}
              description={repo.desc}
              creatorAddress={repo.owners[0]}
              link={`/Repo/${repo.name}`}
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