import { useWorkbench } from "../../store";
import { useCallback, useEffect } from "preact/hooks";
import yaml from "js-yaml";

const Card = () => {
  const { workbench, config, entities } = useWorkbench();

  const updateCard = useCallback(() => {
    const mount = document.getElementById("Mount");
    if (mount === null) return;

    const card = mount.children[0];
    if (card === undefined) return;

    try {
      const entitiesParsed = JSON.parse(entities);
      const configParsed = yaml.load(config);

      if (entitiesParsed) {
        /* @ts-ignore */
        card.hass = {
          states: entitiesParsed,
        };
      }

      if (configParsed) {
        /* @ts-ignore */
        card.setConfig(configParsed);
      }
    } catch (e) {}
  }, [config, entities]);

  useEffect(() => {
    const mount = document.getElementById("Mount");
    if (mount === null || workbench.cardName === undefined) return;

    mount.innerHTML = "";

    const card = document.createElement(workbench.cardName!);
    mount.appendChild(card);
    updateCard();
  }, [updateCard, workbench]);

  useEffect(() => {
    updateCard();
  }, [entities, config, updateCard]);

  return (
    <>
      <script src={workbench.cardUrl} />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id={"Mount"}
      />
    </>
  );
};

export default Card;
