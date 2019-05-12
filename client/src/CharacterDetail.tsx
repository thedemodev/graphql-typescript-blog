import React from "react";
import "./CharacterDetail.css";
import {
  CharacterDetailComponent,
  CharacterDetailFieldsFragment
} from "./gen-types";

interface Props {
  selectedCharacter?: number;
  setSelectedCharacter: (characterId: number) => void;
}

const CharacterDetail: React.FC<Props> = ({
  selectedCharacter,
  setSelectedCharacter
}) => {
  return (
    <div className="CharacterDetail">
      {selectedCharacter ? (
        <CharacterDetailComponent variables={{ id: String(selectedCharacter) }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error || !data || !data.getCharacter) return `Error!`;

            return (
              <Detail
                character={data.getCharacter}
                select={(id: number) => {
                  setSelectedCharacter(id);
                  window.scrollTo(0, 0);
                }}
              />
            );
          }}
        </CharacterDetailComponent>
      ) : (
        <>
          <h2>Character Detail</h2>
          <div>Please select a character</div>
        </>
      )}
    </div>
  );
};

const Detail: React.FC<{
  character: CharacterDetailFieldsFragment;
  select: (characterId: number) => void;
}> = ({ character, select }) => {
  return (
    <>
      <h2>{character.name}</h2>
      {character.allegiances && character.allegiances.length > 0 && (
        <div>
          <strong>Loyal to</strong>:{" "}
          {character.allegiances.map(allegiance => allegiance.name).join(", ")}
        </div>
      )}
      {renderItem("Culture", character.culture)}
      {renderItem("Played by", character.playedBy)}
      {renderListItem("Titles", character.titles)}
      {renderListItem("Aliases", character.aliases)}
      {renderItem("Born", character.born)}
      {renderItem("Died", character.died)}
      {renderItem("Culture", character.culture)}
      {renderCharacter(select, "Father", character.father)}
      {renderCharacter(select, "Mother", character.mother)}
      {renderCharacter(select, "Spouse", character.spouse)}
      {character.children && character.children.length > 0 && (
        <div>
          <strong>Children</strong>:{" "}
          {character.children.map(child => (
            <>
              <a href="#" onClick={() => select(parseInt(child.id))}>
                {child.name}
              </a>{" "}
            </>
          ))}
        </div>
      )}
      {renderListItem(
        "TV Seasons",
        character.appearedIn ? character.appearedIn.map(x => x.name) : []
      )}
      {renderListItem(
        "Books",
        character.books ? character.books.map(x => x.name) : []
      )}
    </>
  );
};

export default CharacterDetail;

const renderItem = (label: string, item?: string | null) => {
  return (
    item && (
      <div>
        <strong>{label}</strong>: {item}
      </div>
    )
  );
};

const renderListItem = (label: string, items?: string[] | null) => {
  return (
    items &&
    items.length > 0 && (
      <div>
        <strong>{label}</strong>: {items.join(", ")}
      </div>
    )
  );
};

const renderCharacter = (
  select: any,
  label: string,
  item: { name: string; id: string } | null
) => {
  return (
    item && (
      <div>
        <strong>{label}</strong>:{" "}
        <a href="#" onClick={() => select(parseInt(item.id))}>
          {item.name}
        </a>
      </div>
    )
  );
};
