import { format } from "date-fns";
import { fr } from "date-fns/locale";
import "moment/locale/fr";
export const numberToLocale = (number: number, loader = false) => {
  if (!number && !loader) return "0";
  if (!number && loader) return "...";
  return number.toLocaleString("fr-FR");
};
export const upperEachFirstLetter = (string: string) => {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export const upperFirstLetter = (string: string) => {
  return (
    string.toLowerCase().charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  );
};
export const upperCaseTrimString = (string: string) => {
  return string.toUpperCase().trim();
};
export const dateToLocale = (date: Date) => {
  //afficher que la date sans l'heure
  return new Date(date).toLocaleDateString("fr-FR");
};

//date local avec heure
export const dateToLocaleWithHour = (date: Date) => {
  return new Date(date).toLocaleString("fr-FR");
};
export const formatMoney = (value: number, symbol: string = "F CFA") => {
  const roundedValue = formatToNear(value);

  let formattedValue = roundedValue.toLocaleString("fr-FR", {
    style: "currency",
    currency: "XOF",
    notation: "standard",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  formattedValue = formattedValue
    .replace(/ /g, "\u00A0")
    .replace(/,/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(" ", ".");
  formattedValue.replace("F CFA", "");
  const replacedCurrency = formattedValue
    .replace("F CFA", symbol)
    .replace("F.CFA", symbol);

  return replacedCurrency;
};

export const formatToNear = (value: number) => {
  return Math.round(value);
};

export const normalizeText = (text: string) => {
  let newText = text.toLowerCase().trim();
  newText = newText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return newText;
};

export const formatDate = (
  date: Date,
  separator: string | null = "/",
  minMonth = false
) => {
  const jour = String(date.getDate()).padStart(2, "0");
  const monthList = minMonth
    ? [
        "Janv",
        "Fév",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juill",
        "Août",
        "Sep",
        "Oct",
        "Nov",
        "Déc",
      ]
    : [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];
  const mois = monthList[date.getMonth()];
  const annee = date.getFullYear();
  if (!separator) return `${jour} ${mois} ${annee}`;
  return `${jour} ${separator} ${mois} ${separator} ${annee}`;
};
export const getDay = (date: Date, minDay = false) => {
  const dayList = minDay
    ? ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
    : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  return dayList[date.getDay()];
};

export const formatPhoneNumber = (phone: string) => {
  //exemple: 07 07 07 07 07
  return phone.replace(/(\d{2})(?=\d)/g, "$1 ");
};
export const formatDateTime = (date: Date, separator = "") => {
  //exemple: 02H${separator}05.
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour}H${separator}${minute}`;
};

type enoughtNameFormater = {
  firstname: string;
  lastname?: string;
  maxLength: number;
};
type enoughtNameFormaterReturn = {
  firstname: string;
  lastname?: string;
  fullname: string;
};
export const enoughtNameFormater: (
  options: enoughtNameFormater
) => enoughtNameFormaterReturn = (options: enoughtNameFormater) => {
  const { firstname, lastname, maxLength } = options;
  const totalLength = firstname.length + (lastname ? lastname.length + 1 : 0);
  const totalName = lastname ? `${firstname} ${lastname}` : firstname;
  if (totalLength <= maxLength)
    return {
      firstname: upperEachFirstLetter(firstname),
      lastname: lastname ? upperEachFirstLetter(lastname) : undefined,
      fullname: upperEachFirstLetter(totalName),
    };

  const names = firstname.split(" ");
  let currentLength = lastname ? lastname.length + 1 : 0;
  let returnedName = "";
  for (let i = 0; i < names.length; i++) {
    currentLength += names[i].length;
    if (currentLength <= maxLength) {
      returnedName += names[i] + " ";
    } else {
      if (currentLength - names[i].length + 2 <= maxLength) {
        returnedName = returnedName + names[i].charAt(0) + ". ";
      }
      break;
    }
  }
  const newFirstname = upperEachFirstLetter(returnedName.trim());
  const fullname = returnedName + (lastname ? lastname : "");
  return {
    firstname: newFirstname,
    lastname: lastname ? upperEachFirstLetter(lastname) : undefined,
    fullname: upperEachFirstLetter(fullname),
  };
};

export const giveFormatedDate = (
  startDate: Date,
  endDate: Date,
  joinString = "|"
) => {
  const returnedTable: Array<string> = [];
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();

  if (startYear === endYear && startMonth === endMonth) {
    returnedTable.push(
      format(startDate, "d", { locale: fr }) +
        "-" +
        format(endDate, "d", { locale: fr })
    );
    returnedTable.push(format(startDate, "MMM", { locale: fr }));
    returnedTable.push(startYear.toString());
  } else if (startYear === endYear && startMonth !== endMonth) {
    returnedTable.push(
      format(startDate, "d MMM", { locale: fr }) +
        "-" +
        format(endDate, "d MMM", { locale: fr })
    );
    returnedTable.push(startYear.toString());
  } else {
    returnedTable.push(format(startDate, "d MMM yyyy", { locale: fr }));
    returnedTable.push("-");
    returnedTable.push(format(endDate, "d MMM yyyy", { locale: fr }));
  }

  return { table: returnedTable, joined: returnedTable.join(joinString) };
};
