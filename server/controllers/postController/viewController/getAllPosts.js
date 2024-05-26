const postModel = require("../../../models/postModel");
const candidateModel = require("../../../models/candidateModel");
const positionModel = require("../../../models/positionModel");

module.exports = async(req, res) => {
    try {
        const posts = await postModel.find().sort({createdAt: -1});

        // populate postedBy on basis of userType
        for(let i=0; i<posts.length; i++){
            if(posts[i].userType === 'admin')
                posts[i] = await posts[i].populate('postedBy', '_id name profileImage role', 'Admin');
            else{
                let candidate = await candidateModel.findById({_id: posts[i].postedBy});
                candidate = await candidate.populate('position', '_id name', 'Position');

                // check if the candidate has been elected as any position winner
                const position = await positionModel.findById({_id: candidate.position._id});

                if(position.electedCandidate !== null && position.electedCandidate.equals(candidate._id))
                    posts[i]._doc.positionApplied = candidate.position.name
                else
                    posts[i]._doc.positionApplied = `Running for ${candidate.position.name}`;

                posts[i].postedBy = candidate.student;

                posts[i] = await posts[i].populate('postedBy', '_id name profileImage role', 'Student');

            }
        }

        // console.log('posts: ', posts);

        res.status(200).send({
            success: true,
            message: 'All posts have been fetched',
            posts
        });
    } catch (error) {
        console.log(`Error in get-all-post api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in get-all-post api',
            error
        });
    }
}