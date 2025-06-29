<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PatientResource\Pages;
use App\Filament\Resources\PatientResource\RelationManagers;
use App\Models\Patient;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PatientResource extends Resource
{
    protected static ?string $model = Patient::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Patient Records')
                    ->schema([
                        TextInput::make('first_name')
                            ->label('First Name')
                            ->required(),
                        TextInput::make('last_name')
                            ->label('Last Name')
                            ->required(),
                        TextInput::make('age')
                            ->label('Age')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(100)
                            ->required(),
                        TextInput::make('gender')
                            ->label('Gender')
                            ->required(),
                        TextInput::make('address')
                            ->label('Address'),
                        TextInput::make('phone')
                            ->label('Phone')
                            ->tel()
                            ->maxLength(11)
                            ->required(),
                        TextInput::make('email')
                            ->label('Email'),
                        TextInput::make('facebook')
                            ->label('Facebook'),
                        TextInput::make('other_contacts')
                            ->label('Other Contacts'),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('first_name')
                ->searchable()
                ->sortable(),
                Tables\Columns\TextColumn::make('last_name')
                ->searchable()
                ->sortable(),
                Tables\Columns\TextColumn::make('age'),
                Tables\Columns\TextColumn::make('gender'),
                Tables\Columns\TextColumn::make('address'),
                Tables\Columns\TextColumn::make('phone'),
                Tables\Columns\TextColumn::make('email'),
                Tables\Columns\TextColumn::make('facebook'),
                Tables\Columns\TextColumn::make('other_contacts'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPatients::route('/'),
            'create' => Pages\CreatePatient::route('/create'),
            'view' => Pages\ViewPatient::route('/{record}'),
            'edit' => Pages\EditPatient::route('/{record}/edit'),
        ];
    }
}
