import { Component, OnInit, Input, Output, Inject, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExpensesBill } from './../../models/ExpensesBill';
import { ElectContract } from './../../models/ElectContract';
import { GasContract } from './../../models/GasContract';
import { Result } from './../../models/Result';
import 'hammerjs';

export interface DialogData {
  http: HttpClient;
  httpOptions: HttpHeaders;
  URL: string;
  id: number;
}

@Component({
  selector: 'app-elect-form',
  templateUrl: './elect-form.component.html',
  styleUrls: ['./elect-form.component.css']
})
export class ElectFormComponent implements OnInit {

// Properties of ExpensesFormComponent Class related to HTTP
URL_BASE = 'https://miguellzpf.asuscomm.com:3000/expenses_bills/';
httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

// Form related Properties
electForm: FormGroup;
gasForm: FormGroup;
group = new FormControl('test', {
  updateOn: 'blur'
});
taxes = new FormControl(21, {
  validators: [ Validators.required,
                Validators.min(1),
                Validators.max(100)]
});

// General Properties
isInHistory = false;
duplId = 0;
history: ExpensesBill[];
bill: ExpensesBill = ({
  id: undefined,
  groupKey: undefined,
  timeStamp: undefined,
  taxes: undefined,
  electData: ({
    power: undefined,
    days: 0,
    consumed: 0,
    powerPrice: 0,
    consumedPrice: 0
  }) as ElectContract,
  gasData: ({
    days: 0,
    consumed: 0,
    fixedPrice: 0,
    consumedPrice: 0
  }) as GasContract,
  result: ({
    totalElect: 0,
    totalElectVAT: 0,
    totalGas: 0,
    totalGasVAT: 0,
    total: 0,
    totalVAT: 0
  }) as Result
}) as ExpensesBill;

constructor(public formBuilder: FormBuilder, public http: HttpClient, public dialog: MatDialog) {  } // CONSTRUCTOR

ngOnInit() {
  this.buildElectForm();
  this.buildGasForm();
  this.duplId = undefined;
  this.isInHistory = false;
  this.group.valueChanges.subscribe( group => {
    this.getHistory(group, false);
  });
}

// Init Electricity Form values with default values and set validators
buildElectForm = async () => {
  this.electForm = this.formBuilder.group({
    powerPrice: new FormControl(0.126, [Validators.required, Validators.min(0), Validators.max(50)]),
    days: new FormControl(30, [Validators.required, Validators.min(1), Validators.max(100)]),
    power: new FormControl(5.5, [Validators.required, Validators.min(1), Validators.max(50)]),
    consumedPrice: new FormControl(0.148, [Validators.required, Validators.min(0), Validators.max(50)]),
    consumed: new FormControl(144, [Validators.required, Validators.min(0)])
  });
}

// Init Gas Form values with default values and set validators
buildGasForm = async () => {
  this.gasForm = this.formBuilder.group({
    fixedPrice: new FormControl(0.173, [Validators.required, Validators.min(0), Validators.max(50)]),
    days: new FormControl(19, [Validators.required, Validators.min(1), Validators.max(100)]),
    consumedPrice: new FormControl(0.0634, [Validators.required, Validators.min(0), Validators.max(50)]),
    consumed: new FormControl(193, [Validators.required, Validators.min(0)])
  });
}
resetOrClearBill = async (): Promise<ExpensesBill> => {
  return ({
    id: undefined,
    groupKey: undefined,
    timeStamp: undefined,
    taxes: undefined,
    electData: ({
      power: 0,
      days: 0,
      consumed: 0,
      powerPrice: 0,
      consumedPrice: 0
    }) as ElectContract,
    gasData: ({
      days: 0,
      consumed: 0,
      fixedPrice: 0,
      consumedPrice: 0
    }) as GasContract,
    result: ({
      totalElect: 0,
      totalElectVAT: 0,
      totalGas: 0,
      totalGasVAT: 0,
      total: 0,
      totalVAT: 0
    }) as Result
  }) as ExpensesBill;
}
// Function called by reset buttons
resetFormToDefault = async () => {
  this.buildElectForm();
  this.buildGasForm();
  this.duplId = undefined;
  this.isInHistory = false;
  this.bill = await this.resetOrClearBill();
}
// Function called by clear buttons
clearForm = async () => {
  this.electForm.reset();
  this.gasForm.reset();
  this.duplId = undefined;
  this.isInHistory = false;
  this.bill = await this.resetOrClearBill();
}

/***** REST Calls *****/
calculateBill = async () => {
  const reqBill = await this.dataFromFormToJson();
  console.log(reqBill);
  this.http.post<ExpensesBill>(this.URL_BASE, reqBill, this.httpOptions).subscribe(
    data => {
      console.log(data);
      this.bill = data;
      if (data.groupKey !== undefined && data.groupKey !== '') {
        this.getHistory(data.groupKey, true);
      }
    }
  );
}

deleteBillInHistory = async (id: number) => {
  this.http.delete<boolean>(`${this.URL_BASE}${id}`, this.httpOptions).subscribe(
    result => {
      console.log(result);
      if (result) {
        this.getHistory(this.group.value, false);
      }
    }
  );
}

getHistory = async (group: string, check: boolean) => {
  this.http.get<ExpensesBill[]>(`${this.URL_BASE}groups/${group}`, this.httpOptions).subscribe(
    data => {
      this.history = data;
      if (this.history !== null && this.history !== undefined) {
        if (this.history.length > 0) {
          this.history.sort((a, b) => (a.timeStamp < b.timeStamp) ? 1 : -1);
        }
      }
      if (check) {this.checkResultInHistory(); }
    }
  );
}
/*---- REST Calls ----*/

dataFromFormToJson = async (): Promise<ExpensesBill> => {
  return {
    id: undefined,
    groupKey: this.group.value,
    timeStamp: undefined,
    taxes: this.taxes.value,
    electData: {
      power: this.electForm.get('power').value,
      days: this.electForm.get('days').value,
      consumed: this.electForm.get('consumed').value,
      powerPrice: this.electForm.get('powerPrice').value,
      consumedPrice: this.electForm.get('consumedPrice').value
    } as ElectContract,
    gasData: {
      days: this.gasForm.get('days').value,
      consumed: this.gasForm.get('consumed').value,
      fixedPrice: this.gasForm.get('fixedPrice').value,
      consumedPrice: this.gasForm.get('consumedPrice').value
    } as GasContract
  } as ExpensesBill;
}

dataFromJsonToForm = async (jsonBill: ExpensesBill) => {
  this.group.setValue(jsonBill.groupKey);
  this.taxes.setValue(jsonBill.taxes);
  this.electForm.setValue(jsonBill.electData);
  this.gasForm.setValue(jsonBill.gasData);
}

checkResultInHistory = async () => {
  this.isInHistory = false;
  this.duplId = undefined;
  this.history.forEach((record) => {
    if (record.id == this.bill.id) {
      this.isInHistory = true;
      this.duplId = this.bill.id;
    } else {
      // this.isInHistory = false;
    }
  });
}

openDelDialog(idToDel: number) {
  const dialogRef = this.dialog.open(DeleteBillInHistoryDialog, {
    width: '250px',
    data: {
      http: this.http,
      httpOptions: this.httpOptions,
      URL: this.URL_BASE,
      id: idToDel
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.getHistory(this.group.value, false);
  });
}

delay = async (ms: number) => {
  return new Promise( resolve => setTimeout(resolve, ms) );
}


// Error messages
// TODO: implement taxes
getElectErrorMessage = (field: string) => {
  switch (field) {
    case 'powerPrice': {
        return this.electForm.get(field).hasError('required') ? 'You must enter a value' :
          this.electForm.get(field).hasError('min') ? 'It has to be more than 0 €KW/day' :
          this.electForm.get(field).hasError('max') ? 'It has to be less than 50 €KW/day' :
          '';
        break;
    }
    case 'days': {
        return this.electForm.get(field).hasError('required') ? 'You must enter a value' :
          this.electForm.get(field).hasError('min') ? 'It has to be at least 1 day' :
          this.electForm.get(field).hasError('max') ? 'It has to be less than 100 days' :
          '';
        break;
    }
    case 'power': {
        return this.electForm.get(field).hasError('required') ? 'You must enter a value' :
          this.electForm.get(field).hasError('min') ? 'It has to be at least 1 KW' :
          this.electForm.get(field).hasError('max') ? 'It has to be less than 50 KW' :
          '';
        break;
    }
    case 'consumedPrice': {
        return this.electForm.get(field).hasError('required') ? 'You must enter a value' :
          this.electForm.get(field).hasError('min') ? 'It has to be more than 0 €/KWh' :
          this.electForm.get(field).hasError('max') ? 'It has to be less than 50 €/KWh' :
          '';
        break;
    }
    case 'consumed': {
        return this.electForm.get(field).hasError('required') ? 'You must enter a value' :
          this.electForm.get(field).hasError('min') ? 'It has to be at least 0 KWh' :
          '';
        break;
    }
    default: {
        // statements;
        break;
    }
  }
}

getGasErrorMessage = (field: string) => {
  switch (field) {
    case 'fixedPrice': {
        return this.gasForm.get(field).hasError('required') ? 'You must enter a value' :
          this.gasForm.get(field).hasError('min') ? 'It has to be more than 0 €/day' :
          this.gasForm.get(field).hasError('max') ? 'It has to be less than 50 €/day' :
          '';
        break;
    }
    case 'days': {
        return this.gasForm.get(field).hasError('required') ? 'You must enter a value' :
          this.gasForm.get(field).hasError('min') ? 'It has to be at least 1 day' :
          this.gasForm.get(field).hasError('max') ? 'It has to be less than 100 days' :
          '';
        break;
    }
    case 'consumedPrice': {
        return this.gasForm.get(field).hasError('required') ? 'You must enter a value' :
          this.gasForm.get(field).hasError('min') ? 'It has to be more than 0 €/KWh' :
          this.gasForm.get(field).hasError('max') ? 'It has to be less than 50 €/KWh' :
          '';
        break;
    }
    case 'consumed': {
        return this.gasForm.get(field).hasError('required') ? 'You must enter a value' :
          this.gasForm.get(field).hasError('min') ? 'It has to be at least 0 KWh' :
          '';
        break;
    }
    default: {
        // statements;
        break;
    }
  }
}

getTaxesErrorMessages = () => {
  return this.taxes.hasError('required') ? 'You must enter a value' :
    this.taxes.hasError('min') ? 'It has to be at least 1%' :
    this.taxes.hasError('max') ? 'It has to be less than 100% ' :
    '';
}

}

@Component({
selector: 'app-delete-bill-in-history-dialog',
templateUrl: 'delete-bill-in-history-dialog.html',
})

export class DeleteBillInHistoryDialog {
constructor(
  public dialogRef: MatDialogRef<DeleteBillInHistoryDialog>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

onNoClick(): void {
  this.dialogRef.close();
}

deleteBillInHistory = async () => {
  this.data.http.delete<boolean>(`${this.data.URL}${this.data.id}`).subscribe(
    result => {
      console.log(result);
      this.dialogRef.close();
    }
  );
}

}
