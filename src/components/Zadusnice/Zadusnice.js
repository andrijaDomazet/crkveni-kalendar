import React from "react";
import "./Zadusnice.scss";

export default function Zadusnice() {
  return (
    <div className="zadusnice">
      <table>
        <thead>
          <tr>
            <th colSpan="2">Zadušnice u 2025. godini</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>22. februar</td>
            <td>Zimske</td>
          </tr>
          <tr>
            <td>7. jun</td>
            <td>Letnje</td>
          </tr>
          <tr>
            <td>11. oktobar</td>
            <td>Miholjske</td>
          </tr>
          <tr>
            <td>1. novembar</td>
            <td>Mitrovske (jesenje)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
