import React from "react";
import Highlight from "./Highlight";
import styles from "./Feature.module.css";
import Translate, {translate} from '@docusaurus/Translate';
import BrowserOnly from '@docusaurus/BrowserOnly';
export default function Feature() {
  return (
    <div>
      <BrowserOnly>
        <Highlight/>
      </BrowserOnly>
    </div>
  );
}
