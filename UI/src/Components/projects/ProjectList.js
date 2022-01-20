import React from "react"
import ProjectSummary from "./ProjectSummary"

export default function ProjectList(props) {
  const { project, auth } = props
  return (
    <div>
      {project &&
        project.map((element) => {
          return <ProjectSummary proj={element} authInfo={auth} key={element.id} />
        })}
    </div>
  )
}
