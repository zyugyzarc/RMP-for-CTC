AUTH_TOKEN = "dGVzdDp0ZXN0"
SearchTeacherquery = `query NewSearchTeachersQuery($text: String!, $schoolID: ID!)
{
  newSearch {
    teachers(query: {text: $text, schoolID: $schoolID}) {
      edges {
        cursor
        node {
          id
          firstName
          lastName
          school {
            name
            id
          }
        }
      }
    }
  }
}
`

getTeacherQuery = `query TeacherRatingsPageQuery(
  $id: ID!
) {
  node(id: $id) {
    ... on Teacher {
      id
      firstName
      lastName
      school {
        name
        id
        city
        state
      }
      avgDifficulty
      avgRating
      department
      numRatings
      legacyId
      wouldTakeAgainPercent
    }
    id
  }
}
`;

// stolen from <https://github.com/Michigan-Tech-Courses/rate-my-professors/blob/master/src/queries.ts>

async function searchTeacher(name){
	let res = await fetch("https://www.ratemyprofessors.com/graphql",
		{
	  	method: "POST",
	    headers: {
	    	authorization: `Basic ${AUTH_TOKEN}`
	  	},
	    body: JSON.stringify({
	    	query: SearchTeacherquery,
	      variables: {
	      	text: name.toLowerCase(),
	        schoolID: "U2Nob29sLTE1NTM="
	      }
	    })
	    	
	  }
	)
	res = await res.json()
	return res.data.newSearch.teachers.edges[0].node.id
  //console.log(res)
	//.then(val=>{val.json().then(v=>console.log(v.data.newSearch.teachers.edges[0].node.id))})
}

async function getRating(id){
  let res = await fetch("https://www.ratemyprofessors.com/graphql",
		{
	  	method: "POST",
	    headers: {
	    	authorization: `Basic ${AUTH_TOKEN}`
	  	},
	    body: JSON.stringify({
	    	query: getTeacherQuery,
	      variables: {
	      	id: id
	      }
	    })
	    	
	  }
	)
	res = await res.json()

	return res.data.node
}

function get(name, sender, ret){
	console.log(name)
	
	searchTeacher(name).then(id=>{
		getRating(id).then(data=>{
			console.log(data)
			ret(data)
		})
	}).catch(err=>ret({}))
	return true
}

chrome.runtime.onInstalled.addListener(()=>{
	chrome.runtime.onMessage.addListener(get)
})